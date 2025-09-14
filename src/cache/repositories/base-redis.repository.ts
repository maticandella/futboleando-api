import redis from '../redis.client';

export type TtlSeconds = number;

export type BaseRedisOptions = {
    prefix: string;
    defaultTtlSeconds?: number;
    sep?: ":"; 
};

export abstract class BaseRedisRepository {
    protected readonly prefix: string;
    protected readonly sep: string;
    protected readonly defaultTtl?: number;

    protected key(...parts: (string | number | null | undefined)[]): string {
        const rest = parts
            .filter((p): p is string | number => p !== null && p !== undefined)
            .map(String)
            .map(s => s.replace(new RegExp(`${this.sep}+`, "g"), this.sep))
            .map(s => s.replace(new RegExp(`^${this.sep}|${this.sep}$`, "g"), ""));
        return [this.prefix, ...rest].join(this.sep);
    }

    constructor(options: BaseRedisOptions) {
        this.sep = options.sep ?? ":";
        this.prefix = options.prefix.replace(/:+$/, '');
        this.defaultTtl = options.defaultTtlSeconds;
    }

    async getRaw(key: string): Promise<string | null> {
        return redis.get(key);
    }

    async setRaw(key: string, value: string, ttl?: TtlSeconds): Promise<void> {
        if (ttl && ttl > 0) await redis.set(key, value, "EX", ttl);
        else await redis.set(key, value);
    }

    async exists(...parts: (string | number)[]): Promise<boolean> {
        return (await redis.exists(this.key(...parts))) === 1;
    }

    //* Manejo de JSONs
    async getJson<T>(...parts: (string | number)[]): Promise<T | null> {
    const key = this.key(...parts);
    const raw = await redis.get(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
    }

    async setJson<T>(
        value: T,
        parts: (string | number)[],
        ttl?: TtlSeconds
    ): Promise<void> {
        const key = this.key(...parts);
        const v = JSON.stringify(value);
        await this.setRaw(key, v, ttl ?? this.defaultTtl);
    }
}