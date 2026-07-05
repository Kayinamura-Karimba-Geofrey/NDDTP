import { Injectable, Logger } from '@nestjs/common';
import { FacilityRepository } from './repositories/facility.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateFacilityDto, UpdateFacilityDto } from './dto/facility.dto';
import { ResourceNotFoundException, DuplicateResourceException } from '../../common/exceptions/medical.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { FacilityStatus } from '../../common/enums';

@Injectable()
export class FacilityService {
  private readonly logger = new Logger(FacilityService.name);

  constructor(
    private readonly repo: FacilityRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateFacilityDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const facility = await this.repo.create({
      code: dto.code,
      name: dto.name,
      type: dto.type,
      location: dto.location ?? null,
      capacity: dto.capacity ?? 0,
      phone: dto.phone ?? null,
      status: FacilityStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.ACTIVE_FACILITIES);
    await this.publisher.publishFacilityCreated({ facilityId: facility.id, code: facility.code, name: facility.name });
    this.logger.log(`Facility created: ${facility.code}`);
    return facility;
  }

  async update(id: string, dto: UpdateFacilityDto) {
    const facility = await this.repo.findById(id);
    if (!facility) throw new ResourceNotFoundException('MedicalFacility', id);

    await this.repo.update(id, dto);
    await this.redis.del(CACHE_KEYS.FACILITY(id), CACHE_KEYS.ACTIVE_FACILITIES);
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.FACILITY(id));
    if (cached) return JSON.parse(cached);

    const facility = await this.repo.findById(id);
    if (!facility) throw new ResourceNotFoundException('MedicalFacility', id);
    await this.redis.set(CACHE_KEYS.FACILITY(id), JSON.stringify(facility), 300);
    return facility;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ACTIVE_FACILITIES);
    if (cached) return JSON.parse(cached);

    const facilities = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.ACTIVE_FACILITIES, JSON.stringify(facilities), 300);
    return facilities;
  }

  findAll(page = 1, limit = 20) {
    return this.repo.findAll(page, limit);
  }
}
