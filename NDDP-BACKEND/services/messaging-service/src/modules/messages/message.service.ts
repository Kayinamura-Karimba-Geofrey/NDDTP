import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository, MessageReceiptRepository } from './repositories/message.repository';
import { ChannelMemberRepository } from '../channels/repositories/channel.repository';
import { ChannelService } from '../channels/channel.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { SendMessageDto, MarkDeliveredDto, MarkReadDto } from './dto/message.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException, ForbiddenChannelAccessException,
} from '../../common/exceptions/messaging.exceptions';
import { ChannelStatus, MessageType, MessageStatus, ReceiptStatus } from '../../common/enums';
import { MESSAGE_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly repo: MessageRepository,
    private readonly receiptRepo: MessageReceiptRepository,
    private readonly memberRepo: ChannelMemberRepository,
    private readonly channelService: ChannelService,
    private readonly publisher: EventPublisherService,
  ) {}

  async send(senderId: string, dto: SendMessageDto) {
    await this.channelService.assertMembership(dto.channelId, senderId);
    const channel = await this.channelService.findById(dto.channelId, senderId);
    if (channel.status !== ChannelStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Cannot send messages to an archived channel');
    }

    const message = await this.repo.create({
      channelId: dto.channelId,
      senderId,
      content: dto.content,
      messageType: dto.messageType ?? MessageType.TEXT,
      status: MessageStatus.SENT,
      metadata: dto.metadata ?? null,
    });

    await this.publisher.publishMessageSent({
      messageId: message.id, channelId: dto.channelId, senderId,
    });
    this.logger.log(`Message sent in channel ${dto.channelId}`);
    return this.repo.findById(message.id);
  }

  async findByChannel(channelId: string, userId: string, page = 1, limit = 20) {
    await this.channelService.assertMembership(channelId, userId);
    return this.repo.findByChannelAllStatuses(channelId, page, limit);
  }

  async findById(id: string, userId: string) {
    const message = await this.repo.findById(id);
    if (!message) throw new ResourceNotFoundException('Message', id);
    await this.channelService.assertMembership(message.channelId, userId);
    return message;
  }

  async markDelivered(id: string, dto: MarkDeliveredDto) {
    const message = await this.repo.findById(id);
    if (!message) throw new ResourceNotFoundException('Message', id);
    this.assertTransition(message.status, MessageStatus.DELIVERED);

    const member = await this.memberRepo.findByChannelAndUser(message.channelId, dto.recipientId);
    if (!member) throw new ForbiddenChannelAccessException();

    const existing = await this.receiptRepo.findByMessageAndRecipient(id, dto.recipientId);
    if (!existing) {
      await this.receiptRepo.create({
        messageId: id,
        recipientId: dto.recipientId,
        status: ReceiptStatus.DELIVERED,
        acknowledgedAt: new Date(),
      });
    }

    await this.repo.update(id, { status: MessageStatus.DELIVERED });
    await this.publisher.publishMessageDelivered({ messageId: id, recipientId: dto.recipientId });
    return this.repo.findById(id);
  }

  async markRead(id: string, dto: MarkReadDto) {
    const message = await this.repo.findById(id);
    if (!message) throw new ResourceNotFoundException('Message', id);
    this.assertTransition(message.status, MessageStatus.READ);

    const member = await this.memberRepo.findByChannelAndUser(message.channelId, dto.recipientId);
    if (!member) throw new ForbiddenChannelAccessException();

    const existing = await this.receiptRepo.findByMessageAndRecipient(id, dto.recipientId);
    if (existing) {
      await this.receiptRepo.update(existing.id, { status: ReceiptStatus.READ, acknowledgedAt: new Date() });
    } else {
      await this.receiptRepo.create({
        messageId: id,
        recipientId: dto.recipientId,
        status: ReceiptStatus.READ,
        acknowledgedAt: new Date(),
      });
    }

    await this.repo.update(id, { status: MessageStatus.READ });
    await this.publisher.publishMessageRead({ messageId: id, recipientId: dto.recipientId });
    return this.repo.findById(id);
  }

  async deleteMessage(id: string, userId: string) {
    const message = await this.repo.findById(id);
    if (!message) throw new ResourceNotFoundException('Message', id);
    if (message.senderId !== userId) {
      throw new BusinessRuleViolationException('You can only delete your own messages');
    }
    this.assertTransition(message.status, MessageStatus.DELETED);
    await this.repo.update(id, { status: MessageStatus.DELETED });
    return this.repo.findById(id);
  }

  private assertTransition(from: MessageStatus, to: MessageStatus) {
    const allowed = MESSAGE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
