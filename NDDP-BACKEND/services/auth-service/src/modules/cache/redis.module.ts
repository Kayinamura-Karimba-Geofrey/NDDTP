import { Module, Global, OnModuleDestroy, Injectable, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly client: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async delPattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.client.expire(key, ttlSeconds);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  onModuleDestroy(): void {
    this.client.disconnect();
    this.logger.log('Redis connection closed');
  }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('redis.host') || 'localhost';
        const port = configService.get<number>('redis.port') || 6379;

        const client = new Redis({
          host,
          port,
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
          enableOfflineQueue: false,
          retryStrategy: (times: number) => {
            if (times > 3) {
              return null; // Stop retrying if Redis server is down
            }
            return Math.min(times * 200, 1000);
          },
          maxRetriesPerRequest: 1,
        });

        client.on('connect', () => {
          Logger.log(`Redis connected to ${host}:${port}`, 'RedisModule');
        });

        client.on('error', (err) => {
          Logger.warn(`Redis connection unavailable: ${err.message}`, 'RedisModule');
        });

        return client;
      },
    },
    {
      provide: RedisService,
      inject: [REDIS_CLIENT],
      useFactory: (client: Redis) => new RedisService(client),
    },
  ],
  exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
