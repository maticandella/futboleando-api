import axios from "axios";
import { ApiResult } from "../types/api";

export type ErrorResponse = { success: boolean; error: string };

export function handleServiceError(err: unknown): ErrorResponse {
    const error: ErrorResponse = { success: false, error: '' };
    error.error = (axios.isAxiosError(err)) ? `API error ${err.response?.status}` : "Network or unknown error";
    return error;
}