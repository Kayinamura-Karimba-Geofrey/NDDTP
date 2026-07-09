import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { TemplateModule } from './modules/templates/template.module';
import { PreferenceModule } from './modules/preferences/preference.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-notification-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    NotificationModule,
    TemplateModule,
    PreferenceModule,
  ],
})
export class AppModule {}
