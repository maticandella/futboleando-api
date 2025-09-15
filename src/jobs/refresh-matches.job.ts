import { MatchesRepository } from "../cache/repositories/matches/matches.repository";
import { getMatchesByDate } from "../services/match.service";
import { ApiResult } from "../types/api";
import { RefreshTodayPayload } from "../types/job";
import { getTodayRangeUtcForTZ } from "../utils/datetime";
import { getMatchesDateKey } from "../utils/keys";

const matchesRepository = new MatchesRepository();

export async function refreshTodayMatches(): Promise<ApiResult<RefreshTodayPayload>> {
  const { startUtc, endUtc, dateKey } = getTodayRangeUtcForTZ();
  const dateFrom = (startUtc ?? "").slice(0, 10);
  const dateTo   = (endUtc ?? "").slice(0, 10);

  try {
    const result = await getMatchesByDate(dateFrom ?? '', dateTo ?? '');
    if (!result.success) {
      return { success: false, error: result.error };
    }
    
    const data = result.data;

    await matchesRepository.saveByDate(dateKey, data);
    return {
      success: true,
      data: {
        dateKey,
        count: data.resultSet?.count ?? data.matches?.length ?? 0,
        ttl: MatchesRepository.DEFAULT_TTL,
        key: getMatchesDateKey(dateKey),
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "unknown_error" };
  }
}