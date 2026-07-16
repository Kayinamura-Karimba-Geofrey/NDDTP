import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiConversation } from '../../database/entities/ai-conversation.entity';
import { ConversationRepository } from './repositories/conversation.repository';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { AgentModule } from '../agents/agent.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AiConversation]), AgentModule, RedisModule, EventsModule],
  controllers: [ConversationController],
  providers: [ConversationRepository, ConversationService],
  exports: [ConversationRepository, ConversationService],
})
export class ConversationModule {}
