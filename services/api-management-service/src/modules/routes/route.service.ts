import { Injectable, Logger } from '@nestjs/common';
import { RouteRepository } from './repositories/route.repository';
import { ProductRepository } from '../products/repositories/product.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateRouteDto } from './dto/route.dto';
import {
  DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException,
} from '../../common/exceptions/apimanagement.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { ProductStatus, RouteStatus, HttpMethod } from '../../common/enums';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(
    private readonly repo: RouteRepository,
    private readonly productRepo: ProductRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateRouteDto) {
    const product = await this.productRepo.findById(dto.productId);
    if (!product) throw new ResourceNotFoundException('ApiProduct', dto.productId);
    if (product.status !== ProductStatus.ACTIVE) {
      throw new BusinessRuleViolationException('API product is not active');
    }

    const existing = await this.repo.findByProductAndCode(dto.productId, dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const route = await this.repo.create({
      productId: dto.productId,
      code: dto.code,
      name: dto.name,
      path: dto.path,
      httpMethod: dto.httpMethod ?? HttpMethod.GET,
      upstreamUrl: dto.upstreamUrl,
      description: dto.description ?? null,
      status: RouteStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.PRODUCT_ROUTES(dto.productId));
    await this.publisher.publishRouteCreated({
      routeId: route.id, productId: dto.productId, code: route.code,
    });
    this.logger.log(`API route created: ${route.code}`);
    return this.repo.findById(route.id);
  }

  async findByProduct(productId: string) {
    const cached = await this.redis.get(CACHE_KEYS.PRODUCT_ROUTES(productId));
    if (cached) return JSON.parse(cached);
    const routes = await this.repo.findByProduct(productId);
    await this.redis.set(CACHE_KEYS.PRODUCT_ROUTES(productId), JSON.stringify(routes), 600);
    return routes;
  }

  async findById(id: string) {
    const route = await this.repo.findById(id);
    if (!route) throw new ResourceNotFoundException('ApiRoute', id);
    return route;
  }
}
