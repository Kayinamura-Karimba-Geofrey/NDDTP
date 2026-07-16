import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiMessage } from '../../database/entities/ai-message.entity';
import { MessageRepository } from './repositories/message.repository';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationModule } from '../conversations/conversation.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AiMessage]), ConversationModule, EventsModule],
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
})
export class MessageModule {}
