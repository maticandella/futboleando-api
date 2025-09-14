import { MatchesResponse } from "../../../interfaces/MatchesResponse";
import { ApiResult } from "../../../types/api";
import { BaseRedisRepository } from "../base-redis.repository";

export class MatchesRepository extends BaseRedisRepository {
  static DEFAULT_TTL = 60 * 10;

  constructor() {
    super({ prefix: "fd:matches", defaultTtlSeconds: MatchesRepository.DEFAULT_TTL });
  }

  async getByDate(dateKey: string) {
    return this.getJson<ApiResult<MatchesResponse>>(dateKey);
  }

  async saveByDate(dateKey: string, data: MatchesResponse, ttl?: number) {
    await this.setJson<MatchesResponse>(data, [dateKey], ttl);
  }
}