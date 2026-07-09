import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { TargetModule } from './modules/targets/target.module';
import { CheckModule } from './modules/checks/check.module';
import { AlertModule } from './modules/alerts/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-monitoring-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    TargetModule,
    CheckModule,
    AlertModule,
  ],
})
export class AppModule {}
