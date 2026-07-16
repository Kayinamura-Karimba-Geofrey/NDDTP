import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConversationRepository } from './repositories/conversation.repository';
import { AgentRepository } from '../agents/repositories/agent.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateConversationDto } from './dto/conversation.dto';
import {
  ResourceNotFoundException, BusinessRuleViolationException,
  ForbiddenConversationAccessException, InvalidStatusTransitionException,
} from '../../common/exceptions/aiassistant.exceptions';
import { AgentStatus, ConversationStatus } from '../../common/enums';
import { CACHE_KEYS, CONVERSATION_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private readonly repo: ConversationRepository,
    private readonly agentRepo: AgentRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateConversationDto) {
    const agent = await this.agentRepo.findById(dto.agentId);
    if (!agent) throw new ResourceNotFoundException('AiAgent', dto.agentId);
    if (agent.status !== AgentStatus.ACTIVE) {
      throw new BusinessRuleViolationException('AI agent is not active');
    }

    const conversationNumber = `CONV-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const conversation = await this.repo.create({
      conversationNumber,
      agentId: dto.agentId,
      userId,
      title: dto.title ?? `Chat with ${agent.name}`,
      status: ConversationStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.USER_CONVERSATIONS(userId));
    await this.publisher.publishConversationCreated({
      conversationId: conversation.id, conversationNumber, agentId: dto.agentId, userId,
    });
    this.logger.log(`Conversation created: ${conversationNumber}`);
    return this.repo.findById(conversation.id);
  }

  async findMine(userId: string) {
    const cached = await this.redis.get(CACHE_KEYS.USER_CONVERSATIONS(userId));
    if (cached) return JSON.parse(cached);
    const conversations = await this.repo.findByUser(userId);
    await this.redis.set(CACHE_KEYS.USER_CONVERSATIONS(userId), JSON.stringify(conversations), 300);
    return conversations;
  }

  async findById(id: string, userId: string) {
    const conversation = await this.repo.findById(id);
    if (!conversation) throw new ResourceNotFoundException('AiConversation', id);
    if (conversation.userId !== userId) throw new ForbiddenConversationAccessException();
    return conversation;
  }

  async close(id: string, userId: string) {
    const conversation = await this.findById(id, userId);
    this.assertTransition(conversation.status, ConversationStatus.CLOSED);
    await this.repo.update(id, { status: ConversationStatus.CLOSED });
    await this.redis.del(CACHE_KEYS.USER_CONVERSATIONS(userId));
    return this.repo.findById(id);
  }

  async archive(id: string, userId: string) {
    const conversation = await this.findById(id, userId);
    this.assertTransition(conversation.status, ConversationStatus.ARCHIVED);
    await this.repo.update(id, { status: ConversationStatus.ARCHIVED });
    await this.redis.del(CACHE_KEYS.USER_CONVERSATIONS(userId));
    return this.repo.findById(id);
  }

  private assertTransition(from: ConversationStatus, to: ConversationStatus) {
    const allowed = CONVERSATION_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
