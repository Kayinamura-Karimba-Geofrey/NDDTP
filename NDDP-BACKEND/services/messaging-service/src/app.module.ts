import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { ChannelModule } from './modules/channels/channel.module';
import { MessageModule } from './modules/messages/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-messaging-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    ChannelModule,
    MessageModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
