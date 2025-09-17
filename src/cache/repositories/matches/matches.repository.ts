import { MatchesResponse } from "../../../interfaces/MatchesResponse";
import { BaseRedisRepository } from "../base-redis.repository";

export class MatchesRepository extends BaseRedisRepository {
  constructor() {
    super({ prefix: "fd:matches", defaultTtlSeconds: 60 * 240 });
  }

  async getByDate(dateKey: string): Promise<MatchesResponse | null> {
    return await this.getJson<MatchesResponse>(dateKey);
  }

  async saveByDate(dateKey: string, data: MatchesResponse, ttl?: number) {
    await this.setJson<MatchesResponse>(data, [dateKey], ttl);
  }
}