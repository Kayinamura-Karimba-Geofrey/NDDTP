import { Module, Global, Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(private readonly client: Redis) {}

  async get(key: string): Promise<string | null> { return this.client.get(key); }
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) await this.client.setex(key, ttlSeconds, value);
    else await this.client.set(key, value);
  }
  async del(key: string): Promise<void> { await this.client.del(key); }
  async delPattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) await this.client.del(...keys);
  }

  onModuleDestroy(): void { this.client.disconnect(); }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const client = new Redis({
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
          retryStrategy: (times: number) => Math.min(times * 50, 2000),
        });
        client.on('connect', () => Logger.log('Redis connected', 'RedisModule'));
        return client;
      },
    },
    { provide: RedisService, inject: [REDIS_CLIENT], useFactory: (c: Redis) => new RedisService(c) },
  ],
  exports: [RedisService],
})
export class RedisModule {}
