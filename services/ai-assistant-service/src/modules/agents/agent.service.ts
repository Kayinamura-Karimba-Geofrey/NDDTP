import { Injectable, Logger } from '@nestjs/common';
import { AgentRepository } from './repositories/agent.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateAgentDto } from './dto/agent.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/aiassistant.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { AgentStatus } from '../../common/enums';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private readonly repo: AgentRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateAgentDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const agent = await this.repo.create({
      code: dto.code,
      name: dto.name,
      agentType: dto.agentType,
      systemPrompt: dto.systemPrompt,
      modelName: dto.modelName ?? 'gpt-4',
      description: dto.description ?? null,
      status: AgentStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.AGENTS);
    await this.publisher.publishAgentCreated({ agentId: agent.id, code: agent.code });
    this.logger.log(`AI agent created: ${agent.code}`);
    return agent;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.AGENTS);
    if (cached) return JSON.parse(cached);
    const agents = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.AGENTS, JSON.stringify(agents), 600);
    return agents;
  }

  async findById(id: string) {
    const agent = await this.repo.findById(id);
    if (!agent) throw new ResourceNotFoundException('AiAgent', id);
    return agent;
  }
}
