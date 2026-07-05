import { Injectable, Logger } from '@nestjs/common';
import { WorkflowDefinitionRepository } from './repositories/workflow-definition.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateWorkflowDefinitionDto } from './dto/workflow-definition.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/workflow.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { DefinitionStatus } from '../../common/enums';

@Injectable()
export class WorkflowDefinitionService {
  private readonly logger = new Logger(WorkflowDefinitionService.name);

  constructor(
    private readonly repo: WorkflowDefinitionRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateWorkflowDefinitionDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);
    if (!dto.steps?.length) throw new BusinessRuleViolationException('Workflow must have at least one step');

    const definition = await this.repo.createWithSteps(
      {
        code: dto.code,
        name: dto.name,
        entityType: dto.entityType,
        description: dto.description ?? null,
        status: DefinitionStatus.ACTIVE,
      },
      dto.steps.map((s) => ({
        stepOrder: s.stepOrder,
        name: s.name,
        approverRole: s.approverRole,
        isRequired: s.isRequired ?? true,
      })),
    );

    await this.redis.del(CACHE_KEYS.DEFINITIONS);
    await this.publisher.publishDefinitionCreated({ definitionId: definition!.id, code: dto.code, entityType: dto.entityType });
    this.logger.log(`Workflow definition created: ${dto.code}`);
    return definition;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.DEFINITIONS);
    if (cached) return JSON.parse(cached);
    const definitions = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.DEFINITIONS, JSON.stringify(definitions), 600);
    return definitions;
  }

  async findById(id: string) {
    const definition = await this.repo.findById(id);
    if (!definition) throw new ResourceNotFoundException('WorkflowDefinition', id);
    return definition;
  }
}
