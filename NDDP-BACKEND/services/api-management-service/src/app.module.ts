import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { ProductModule } from './modules/products/product.module';
import { RouteModule } from './modules/routes/route.module';
import { ConsumerModule } from './modules/consumers/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-api-management-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    ProductModule,
    RouteModule,
    ConsumerModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
