import { Injectable, Logger } from '@nestjs/common';
import { FitnessRepository } from './repositories/fitness.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/medical.exceptions';
import { CreateFitnessDto, RevokeFitnessDto } from './dto/fitness.dto';
import { FitnessStatus } from '../../common/enums';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class FitnessService {
  private readonly logger = new Logger(FitnessService.name);

  constructor(
    private readonly repo: FitnessRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async assess(assessedBy: string, dto: CreateFitnessDto) {
    const existing = await this.repo.findActiveByUser(dto.userId);
    if (existing) {
      await this.repo.update(existing.id, { status: FitnessStatus.REVOKED });
    }

    const assessment = await this.repo.create({
      userId: dto.userId,
      classification: dto.classification,
      validFrom: dto.validFrom,
      validUntil: dto.validUntil ?? null,
      restrictions: dto.restrictions ?? null,
      notes: dto.notes ?? null,
      assessedBy,
      status: FitnessStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.FITNESS(dto.userId));
    await this.publisher.publishFitnessAssessed({
      assessmentId: assessment.id, userId: dto.userId, classification: dto.classification, assessedBy,
    });

    this.logger.log(`Fitness assessed for user ${dto.userId}: ${dto.classification}`);
    return assessment;
  }

  async revoke(id: string, dto: RevokeFitnessDto) {
    const assessment = await this.findById(id);
    if (assessment.status !== FitnessStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Only active assessments can be revoked');
    }

    await this.repo.update(id, { status: FitnessStatus.REVOKED, notes: dto.reason });
    await this.redis.del(CACHE_KEYS.FITNESS(assessment.userId));
    return this.repo.findById(id);
  }

  async getCurrent(userId: string) {
    const cached = await this.redis.get(CACHE_KEYS.FITNESS(userId));
    if (cached) return JSON.parse(cached);

    const assessment = await this.repo.findActiveByUser(userId);
    if (assessment) {
      await this.redis.set(CACHE_KEYS.FITNESS(userId), JSON.stringify(assessment), 300);
    }
    return assessment;
  }

  async findById(id: string) {
    const assessment = await this.repo.findById(id);
    if (!assessment) throw new ResourceNotFoundException('FitnessAssessment', id);
    return assessment;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId);
  }
}
