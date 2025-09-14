import axios from "axios";
import { MatchesResponse } from "../interfaces/MatchesResponse";
import { getHeaders, getUrlBase } from "../utils/headers";
import { ApiResult } from "../types/api";

const baseUrl = getUrlBase();
const headers = getHeaders();

export async function getMatchesByDate(dateFrom: string, dateTo: string): Promise<ApiResult<MatchesResponse>> {
    try {
        const url = `${baseUrl}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        const response = await axios.get<MatchesResponse>(url, { headers: headers , timeout: 30_000});
        return { success: true, data: response.data };
    } catch (err) {
        //TODO aca podría hacer un control de errores más generico y especifico
        if (axios.isAxiosError(err)) {
          return { success: false, error: `API error ${err.response?.status}` };
        }
        return { success: false, error: "Network or unknown error" };
    }
}