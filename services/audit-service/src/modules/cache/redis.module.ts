import { Module, Global, Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(private readonly client: Redis) {}
  get(key: string) { return this.client.get(key); }
  set(key: string, value: string, ttl?: number) {
    return ttl ? this.client.setex(key, ttl, value) : this.client.set(key, value);
  }
  del(key: string) { return this.client.del(key); }
  onModuleDestroy() { this.client.disconnect(); }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [{
    provide: RedisService,
    inject: [ConfigService],
    useFactory: (cs: ConfigService) => {
      const client = new Redis({
        host: cs.get<string>('redis.host'),
        port: cs.get<number>('redis.port'),
        password: cs.get<string>('redis.password'),
        db: cs.get<number>('redis.db'),
      });
      client.on('connect', () => Logger.log('Redis connected', 'RedisModule'));
      return new RedisService(client);
    },
  }],
  exports: [RedisService],
})
export class RedisModule {}
