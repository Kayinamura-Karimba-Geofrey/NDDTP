import { Injectable, Logger } from '@nestjs/common';
import { LocationRepository } from './repositories/location.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateLocationDto } from './dto/location.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/logistics.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { LocationStatus } from '../../common/enums';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    private readonly repo: LocationRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateLocationDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const location = await this.repo.create({
      code: dto.code,
      name: dto.name,
      type: dto.type,
      address: dto.address ?? null,
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      status: LocationStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.LOCATIONS);
    await this.publisher.publishLocationCreated({ locationId: location.id, code: location.code });
    this.logger.log(`Location created: ${location.code}`);
    return location;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.LOCATIONS);
    if (cached) return JSON.parse(cached);
    const locations = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.LOCATIONS, JSON.stringify(locations), 600);
    return locations;
  }

  async findById(id: string) {
    const location = await this.repo.findById(id);
    if (!location) throw new ResourceNotFoundException('LogisticsLocation', id);
    return location;
  }
}
