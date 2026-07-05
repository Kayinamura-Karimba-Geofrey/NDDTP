import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { MetricModule } from './modules/metrics/metric.module';
import { DashboardModule } from './modules/dashboards/dashboard.module';
import { AnalyticsQueryModule } from './modules/queries/analytics-query.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-analytics-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    MetricModule,
    DashboardModule,
    AnalyticsQueryModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
