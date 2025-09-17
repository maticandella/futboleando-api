import axios from "axios";
import { MatchDetailResponse, MatchesResponse } from "../interfaces/MatchesResponse";
import { getHeaders, getUrlBase } from "../utils/headers";
import { ApiResult } from "../types/api";
import { MatchesRepository } from "../cache/repositories/matches/matches.repository";
import { ErrorResponse, handleServiceError } from "../utils/errors-handler";
import { MatchDetailsRepository } from "../cache/repositories/matches/match-details.repository";

type CacheRepo<T> = {
  get: (key: string) => Promise<T | null>;
  set: (key: string, value: T) => Promise<void>;
};

const matchesRepository = new MatchesRepository();
const matchDetailsRepository = new MatchDetailsRepository();
const baseUrl = getUrlBase();

const MATCHES_TIMEOUT_MS = 30_000;
const MATCH_DETAIL_TIMEOUT_MS = 10_000;

export async function getMatchesByDate(dateFrom: string, dateTo: string): Promise<ApiResult<MatchesResponse> | ErrorResponse> {
  try {
      const cacheKey = dateFrom;
      const url = `${baseUrl}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;

      return fetchWithCache<MatchesResponse>(
      {
        get: (key) => matchesRepository.getByDate(key),
        set: (key, value) => matchesRepository.saveByDate(key, value),
      },
        cacheKey,
        url,
        MATCHES_TIMEOUT_MS
      );
  } catch (err) {
      return handleServiceError(err);
  }
}

export async function getMatchDetails(id: string): Promise<ApiResult<MatchDetailResponse> | ErrorResponse> {
  try {
      const cacheKey = id;
      const url = `${baseUrl}/matches/${id}`;

      return fetchWithCache<MatchDetailResponse>(
      {
        get: (key) => matchDetailsRepository.getById(key),
        set: (key, value) => matchDetailsRepository.saveById(key, value),
      },
        cacheKey,
        url,
        MATCH_DETAIL_TIMEOUT_MS
      );
  } catch (err) {
      return handleServiceError(err);
  }
}

//TODO probablemente esta funcion la haga general para todos los servicios
async function fetchWithCache<T>(
  cache: CacheRepo<T>,
  cacheKey: string,
  url: string,
  timeout: number
): Promise<ApiResult<T> | ErrorResponse> {
  const cached = await cache.get(cacheKey);
  if (cached) {
    return { success: true, data: cached };
  }

  try {
    const response = await axios.get<T>(url, {
      headers: getHeaders(),
      timeout,
    });

    await cache.set(cacheKey, response.data);
    return { success: true, data: response.data };
  } catch (err) {
    return handleServiceError(err);
  }
}
