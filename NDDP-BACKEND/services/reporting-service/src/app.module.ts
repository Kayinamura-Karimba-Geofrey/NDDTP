import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { ReportDefinitionModule } from './modules/definitions/report-definition.module';
import { ReportScheduleModule } from './modules/schedules/report-schedule.module';
import { ReportRequestModule } from './modules/requests/report-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-reporting-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    ReportDefinitionModule,
    ReportScheduleModule,
    ReportRequestModule,
  ],
})
export class AppModule {}
