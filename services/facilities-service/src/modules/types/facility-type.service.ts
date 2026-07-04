import { Injectable, Logger } from '@nestjs/common';
import { FacilityTypeRepository } from './repositories/facility-type.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateFacilityTypeDto } from './dto/facility-type.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/facilities.exceptions';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class FacilityTypeService {
  private readonly logger = new Logger(FacilityTypeService.name);

  constructor(
    private readonly repo: FacilityTypeRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateFacilityTypeDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const type = await this.repo.create({
      code: dto.code,
      name: dto.name,
      category: dto.category,
      description: dto.description ?? null,
      isActive: true,
    });

    await this.redis.del(CACHE_KEYS.TYPES);
    await this.publisher.publishTypeCreated({ typeId: type.id, code: type.code });
    this.logger.log(`Facility type created: ${type.code}`);
    return type;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.TYPES);
    if (cached) return JSON.parse(cached);
    const types = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.TYPES, JSON.stringify(types), 600);
    return types;
  }

  async findById(id: string) {
    const type = await this.repo.findById(id);
    if (!type) throw new ResourceNotFoundException('FacilityType', id);
    return type;
  }
}
