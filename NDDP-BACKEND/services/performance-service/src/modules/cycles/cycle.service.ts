import { Injectable, Logger } from '@nestjs/common';
import { CycleRepository } from './repositories/cycle.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCycleDto, UpdateCycleDto } from './dto/cycle.dto';
import { ResourceNotFoundException, DuplicateResourceException, BusinessRuleViolationException } from '../../common/exceptions/performance.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { CycleStatus } from '../../common/enums';

@Injectable()
export class CycleService {
  private readonly logger = new Logger(CycleService.name);

  constructor(
    private readonly repo: CycleRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateCycleDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);
    if (new Date(dto.endDate) < new Date(dto.startDate)) {
      throw new BusinessRuleViolationException('End date must be on or after start date');
    }

    const cycle = await this.repo.create({
      code: dto.code,
      name: dto.name,
      type: dto.type,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description ?? null,
      status: CycleStatus.PLANNED,
    });

    await this.redis.del(CACHE_KEYS.ACTIVE_CYCLE);
    await this.publisher.publishCycleCreated({ cycleId: cycle.id, code: cycle.code, name: cycle.name });
    this.logger.log(`Cycle created: ${cycle.code}`);
    return cycle;
  }

  async update(id: string, dto: UpdateCycleDto) {
    const cycle = await this.repo.findById(id);
    if (!cycle) throw new ResourceNotFoundException('PerformanceCycle', id);

    await this.repo.update(id, dto);
    await this.redis.del(CACHE_KEYS.CYCLE(id), CACHE_KEYS.ACTIVE_CYCLE);
    return this.repo.findById(id);
  }

  async activate(id: string) {
    const cycle = await this.findById(id);
    if (cycle.status !== CycleStatus.PLANNED) {
      throw new BusinessRuleViolationException('Only planned cycles can be activated');
    }
    const active = await this.repo.findActive();
    if (active) {
      await this.repo.update(active.id, { status: CycleStatus.CLOSED });
    }
    await this.repo.update(id, { status: CycleStatus.ACTIVE });
    await this.redis.del(CACHE_KEYS.CYCLE(id), CACHE_KEYS.ACTIVE_CYCLE);
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.CYCLE(id));
    if (cached) return JSON.parse(cached);

    const cycle = await this.repo.findById(id);
    if (!cycle) throw new ResourceNotFoundException('PerformanceCycle', id);
    await this.redis.set(CACHE_KEYS.CYCLE(id), JSON.stringify(cycle), 300);
    return cycle;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ACTIVE_CYCLE);
    if (cached) return JSON.parse(cached);

    const cycle = await this.repo.findActive();
    if (cycle) await this.redis.set(CACHE_KEYS.ACTIVE_CYCLE, JSON.stringify(cycle), 300);
    return cycle;
  }

  findAll(page = 1, limit = 20) {
    return this.repo.findAll(page, limit);
  }
}
