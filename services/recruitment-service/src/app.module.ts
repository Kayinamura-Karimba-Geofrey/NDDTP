import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { JobPostingModule } from './modules/job-postings/job-posting.module';
import { ApplicationModule } from './modules/applications/application.module';
import { InterviewModule } from './modules/interviews/interview.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-recruitment-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    JobPostingModule,
    ApplicationModule,
    InterviewModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
