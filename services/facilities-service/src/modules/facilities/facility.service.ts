import { Injectable, Logger } from '@nestjs/common';
import { FacilityRepository } from './repositories/facility.repository';
import { FacilityTypeRepository } from '../types/repositories/facility-type.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateFacilityDto } from './dto/facility.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/facilities.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { FacilityStatus } from '../../common/enums';

@Injectable()
export class FacilityService {
  private readonly logger = new Logger(FacilityService.name);

  constructor(
    private readonly repo: FacilityRepository,
    private readonly typeRepo: FacilityTypeRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateFacilityDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);
    const type = await this.typeRepo.findById(dto.typeId);
    if (!type) throw new ResourceNotFoundException('FacilityType', dto.typeId);

    const facility = await this.repo.create({
      code: dto.code,
      name: dto.name,
      typeId: dto.typeId,
      location: dto.location ?? null,
      capacity: dto.capacity ?? 0,
      status: FacilityStatus.ACTIVE,
      notes: dto.notes ?? null,
    });

    await this.redis.del(CACHE_KEYS.FACILITIES);
    await this.publisher.publishFacilityCreated({ facilityId: facility.id, code: facility.code, typeId: dto.typeId });
    this.logger.log(`Facility created: ${facility.code}`);
    return this.repo.findById(facility.id);
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.FACILITIES);
    if (cached) return JSON.parse(cached);
    const facilities = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.FACILITIES, JSON.stringify(facilities), 600);
    return facilities;
  }

  findAll(filter: { page?: number; limit?: number; status?: FacilityStatus; typeId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.typeId);
  }

  async findById(id: string) {
    const facility = await this.repo.findById(id);
    if (!facility) throw new ResourceNotFoundException('Facility', id);
    return facility;
  }
}
