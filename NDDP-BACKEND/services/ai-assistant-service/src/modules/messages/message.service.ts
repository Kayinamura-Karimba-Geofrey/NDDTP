import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { ConversationRepository } from '../conversations/repositories/conversation.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { SendMessageDto, CompleteMessageDto, FailMessageDto, CreateAssistantMessageDto } from './dto/message.dto';
import {
  ResourceNotFoundException, BusinessRuleViolationException,
  ForbiddenConversationAccessException, InvalidStatusTransitionException,
} from '../../common/exceptions/aiassistant.exceptions';
import { ConversationStatus, MessageRole, MessageStatus } from '../../common/enums';
import { MESSAGE_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly repo: MessageRepository,
    private readonly conversationRepo: ConversationRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async sendUserMessage(userId: string, dto: SendMessageDto) {
    const conversation = await this.conversationRepo.findById(dto.conversationId);
    if (!conversation) throw new ResourceNotFoundException('AiConversation', dto.conversationId);
    if (conversation.userId !== userId) throw new ForbiddenConversationAccessException();
    if (conversation.status !== ConversationStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Conversation is not active');
    }

    const message = await this.repo.create({
      conversationId: dto.conversationId,
      role: MessageRole.USER,
      content: dto.content,
      status: MessageStatus.COMPLETED,
    });

    await this.publisher.publishMessageSent({
      messageId: message.id, conversationId: dto.conversationId, role: MessageRole.USER,
    });
    this.logger.log(`User message sent in conversation: ${dto.conversationId}`);
    return message;
  }

  async createAssistantPlaceholder(dto: CreateAssistantMessageDto) {
    const conversation = await this.conversationRepo.findById(dto.conversationId);
    if (!conversation) throw new ResourceNotFoundException('AiConversation', dto.conversationId);
    if (conversation.status !== ConversationStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Conversation is not active');
    }

    return this.repo.create({
      conversationId: dto.conversationId,
      role: MessageRole.ASSISTANT,
      content: '',
      status: MessageStatus.PENDING,
    });
  }

  async complete(id: string, dto: CompleteMessageDto) {
    const message = await this.findById(id);
    this.assertTransition(message.status, MessageStatus.COMPLETED);
    await this.repo.update(id, {
      status: MessageStatus.COMPLETED,
      content: dto.content,
      tokenCount: dto.tokenCount ?? null,
    });
    await this.publisher.publishMessageCompleted({
      messageId: id, conversationId: message.conversationId, tokenCount: dto.tokenCount ?? 0,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailMessageDto) {
    const message = await this.findById(id);
    this.assertTransition(message.status, MessageStatus.FAILED);
    const errorMessage = dto.errorMessage ?? 'AI response generation failed';
    await this.repo.update(id, { status: MessageStatus.FAILED, errorMessage });
    await this.publisher.publishMessageFailed({
      messageId: id, conversationId: message.conversationId, reason: errorMessage,
    });
    return this.repo.findById(id);
  }

  async findByConversation(conversationId: string, userId: string) {
    const conversation = await this.conversationRepo.findById(conversationId);
    if (!conversation) throw new ResourceNotFoundException('AiConversation', conversationId);
    if (conversation.userId !== userId) throw new ForbiddenConversationAccessException();
    return this.repo.findByConversation(conversationId);
  }

  async findById(id: string) {
    const message = await this.repo.findById(id);
    if (!message) throw new ResourceNotFoundException('AiMessage', id);
    return message;
  }

  private assertTransition(from: MessageStatus, to: MessageStatus) {
    const allowed = MESSAGE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
