import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { VisitSiteModule } from './modules/sites/visit-site.module';
import { VisitorModule } from './modules/visitors/visitor.module';
import { VisitModule } from './modules/visits/visit.module';
import { CheckInModule } from './modules/checkins/check-in.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-visitor-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    VisitSiteModule,
    VisitorModule,
    VisitModule,
    CheckInModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
