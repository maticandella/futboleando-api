
import { MatchDetailResponse } from "../../../interfaces/MatchesResponse";
import { BaseRedisRepository } from "../base-redis.repository";

export class MatchDetailsRepository extends BaseRedisRepository {
  constructor() {
    super({ prefix: "fd:match", defaultTtlSeconds: 60 * 10 });
  }

  async getById(key: string): Promise<MatchDetailResponse | null> {
    return await this.getJson<MatchDetailResponse>(key);
  }

  async saveById(key: string, data: MatchDetailResponse, ttl?: number) {
    await this.setJson<MatchDetailResponse>(data, [key], ttl);
  }
}