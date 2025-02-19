import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private static instance: RedisService;
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: Number(process.env.REDIS_DB) || 0,
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  onModuleInit() {
    this.redisClient.on('connect', () => console.log('🔗 Connected to Redis'));
    this.redisClient.on('error', (err) =>
      console.error('❌ Redis Error:', err),
    );
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
    console.log('🛑 Redis connection closed');
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async set(key: string, value: any, ttl = 3600) {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async sadd(cacheKey: string, value: string | number | Buffer) {
    await this.redisClient.sadd(cacheKey, value);
  }

  async clear(key: string) {
    const members = await this.redisClient.smembers(key);
    for (const member of members) {
      await this.redisClient.del(member);
    }
  }

  async del(areaCacheKey: string) {
    await this.redisClient.del(areaCacheKey);
  }
}
