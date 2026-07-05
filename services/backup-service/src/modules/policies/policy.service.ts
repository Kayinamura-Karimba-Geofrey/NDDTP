import { Injectable, Logger } from '@nestjs/common';
import { PolicyRepository } from './repositories/policy.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreatePolicyDto } from './dto/policy.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/backup.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { PolicyStatus } from '../../common/enums';

@Injectable()
export class PolicyService {
  private readonly logger = new Logger(PolicyService.name);

  constructor(
    private readonly repo: PolicyRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreatePolicyDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const policy = await this.repo.create({
      code: dto.code,
      name: dto.name,
      backupType: dto.backupType,
      targetType: dto.targetType,
      schedule: dto.schedule,
      retentionDays: dto.retentionDays ?? 30,
      description: dto.description ?? null,
      status: PolicyStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.POLICIES);
    await this.publisher.publishPolicyCreated({ policyId: policy.id, code: policy.code });
    this.logger.log(`Backup policy created: ${policy.code}`);
    return policy;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.POLICIES);
    if (cached) return JSON.parse(cached);
    const policies = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.POLICIES, JSON.stringify(policies), 600);
    return policies;
  }

  async findById(id: string) {
    const policy = await this.repo.findById(id);
    if (!policy) throw new ResourceNotFoundException('BackupPolicy', id);
    return policy;
  }
}
