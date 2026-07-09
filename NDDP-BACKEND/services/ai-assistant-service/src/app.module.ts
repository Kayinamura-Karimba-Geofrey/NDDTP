import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { AgentModule } from './modules/agents/agent.module';
import { ConversationModule } from './modules/conversations/conversation.module';
import { MessageModule } from './modules/messages/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-ai-assistant-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    AgentModule,
    ConversationModule,
    MessageModule,
  ],
})
export class AppModule {}
