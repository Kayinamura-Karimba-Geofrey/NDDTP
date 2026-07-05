import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../database/entities/message.entity';
import { MessageReceipt } from '../../database/entities/message-receipt.entity';
import { MessageRepository, MessageReceiptRepository } from './repositories/message.repository';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ChannelModule } from '../channels/channel.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageReceipt]),
    ChannelModule,
    EventsModule,
  ],
  controllers: [MessageController],
  providers: [MessageRepository, MessageReceiptRepository, MessageService],
})
export class MessageModule {}
