import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CategoryModule } from './modules/categories/category.module';
import { AnnouncementModule } from './modules/announcements/announcement.module';
import { AcknowledgementModule } from './modules/acknowledgements/acknowledgement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-announcement-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CategoryModule,
    AnnouncementModule,
    AcknowledgementModule,
  ],
})
export class AppModule {}
