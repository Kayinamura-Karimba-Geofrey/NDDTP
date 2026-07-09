import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { PolicyModule } from './modules/policies/policy.module';
import { JobModule } from './modules/jobs/job.module';
import { RestoreModule } from './modules/restores/restore.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-backup-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    PolicyModule,
    JobModule,
    RestoreModule,
  ],
})
export class AppModule {}
