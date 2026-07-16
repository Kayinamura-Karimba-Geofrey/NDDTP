import { Injectable, Logger } from '@nestjs/common';
import { FacilitySpaceRepository } from './repositories/facility-space.repository';
import { FacilityRepository } from '../facilities/repositories/facility.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateFacilitySpaceDto } from './dto/facility-space.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/facilities.exceptions';
import { FacilityStatus, SpaceStatus } from '../../common/enums';

@Injectable()
export class FacilitySpaceService {
  private readonly logger = new Logger(FacilitySpaceService.name);

  constructor(
    private readonly repo: FacilitySpaceRepository,
    private readonly facilityRepo: FacilityRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateFacilitySpaceDto) {
    const facility = await this.facilityRepo.findById(dto.facilityId);
    if (!facility) throw new ResourceNotFoundException('Facility', dto.facilityId);
    if (facility.status !== FacilityStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Cannot add spaces to a non-active facility');
    }

    const existing = await this.repo.findByFacilityAndCode(dto.facilityId, dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const space = await this.repo.create({
      facilityId: dto.facilityId,
      code: dto.code,
      name: dto.name,
      spaceType: dto.spaceType,
      capacity: dto.capacity ?? 1,
      status: SpaceStatus.AVAILABLE,
      floor: dto.floor ?? null,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishSpaceCreated({
      spaceId: space.id, code: space.code, facilityId: dto.facilityId, spaceType: dto.spaceType,
    });
    this.logger.log(`Space created: ${space.code}`);
    return this.repo.findById(space.id);
  }

  findAvailable(facilityId?: string) {
    return this.repo.findAvailable(facilityId);
  }

  findAll(filter: { page?: number; limit?: number; facilityId?: string; status?: SpaceStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.facilityId, filter.status);
  }

  async findById(id: string) {
    const space = await this.repo.findById(id);
    if (!space) throw new ResourceNotFoundException('FacilitySpace', id);
    return space;
  }
}
