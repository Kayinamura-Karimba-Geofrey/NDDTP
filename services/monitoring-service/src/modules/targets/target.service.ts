import { Injectable, Logger } from '@nestjs/common';
import { TargetRepository } from './repositories/target.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateTargetDto } from './dto/target.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/monitoring.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { TargetStatus } from '../../common/enums';

@Injectable()
export class TargetService {
  private readonly logger = new Logger(TargetService.name);

  constructor(
    private readonly repo: TargetRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateTargetDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const target = await this.repo.create({
      code: dto.code,
      name: dto.name,
      targetType: dto.targetType,
      endpointUrl: dto.endpointUrl,
      checkIntervalSeconds: dto.checkIntervalSeconds ?? 60,
      description: dto.description ?? null,
      status: TargetStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.TARGETS);
    await this.publisher.publishTargetCreated({ targetId: target.id, code: target.code });
    this.logger.log(`Monitoring target created: ${target.code}`);
    return target;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.TARGETS);
    if (cached) return JSON.parse(cached);
    const targets = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.TARGETS, JSON.stringify(targets), 600);
    return targets;
  }

  async findById(id: string) {
    const target = await this.repo.findById(id);
    if (!target) throw new ResourceNotFoundException('MonitoringTarget', id);
    return target;
  }
}
