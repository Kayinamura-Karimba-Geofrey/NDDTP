import { Injectable, Logger } from '@nestjs/common';
import { RouteRepository } from './repositories/route.repository';
import { LocationRepository } from '../locations/repositories/location.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateRouteDto } from './dto/route.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/logistics.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { RouteStatus } from '../../common/enums';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(
    private readonly repo: RouteRepository,
    private readonly locationRepo: LocationRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateRouteDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);
    if (dto.originLocationId === dto.destinationLocationId) {
      throw new BusinessRuleViolationException('Origin and destination must be different');
    }

    const origin = await this.locationRepo.findById(dto.originLocationId);
    if (!origin) throw new ResourceNotFoundException('LogisticsLocation', dto.originLocationId);
    const dest = await this.locationRepo.findById(dto.destinationLocationId);
    if (!dest) throw new ResourceNotFoundException('LogisticsLocation', dto.destinationLocationId);

    const route = await this.repo.create({
      code: dto.code,
      name: dto.name,
      originLocationId: dto.originLocationId,
      destinationLocationId: dto.destinationLocationId,
      transportMode: dto.transportMode,
      distanceKm: dto.distanceKm ?? null,
      estimatedHours: dto.estimatedHours ?? null,
      status: RouteStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.ROUTES);
    await this.publisher.publishRouteCreated({ routeId: route.id, code: route.code });
    this.logger.log(`Route created: ${route.code}`);
    return this.repo.findById(route.id);
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ROUTES);
    if (cached) return JSON.parse(cached);
    const routes = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.ROUTES, JSON.stringify(routes), 600);
    return routes;
  }

  async findById(id: string) {
    const route = await this.repo.findById(id);
    if (!route) throw new ResourceNotFoundException('TransportRoute', id);
    return route;
  }
}
