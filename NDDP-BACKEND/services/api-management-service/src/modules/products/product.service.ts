import { Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateProductDto } from './dto/product.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/apimanagement.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { ApiProtocol, ProductStatus } from '../../common/enums';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private readonly repo: ProductRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateProductDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const product = await this.repo.create({
      code: dto.code,
      name: dto.name,
      version: dto.version ?? 'v1',
      basePath: dto.basePath,
      protocol: dto.protocol ?? ApiProtocol.REST,
      description: dto.description ?? null,
      status: ProductStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.PRODUCTS);
    await this.publisher.publishProductCreated({ productId: product.id, code: product.code });
    this.logger.log(`API product created: ${product.code}`);
    return product;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.PRODUCTS);
    if (cached) return JSON.parse(cached);
    const products = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.PRODUCTS, JSON.stringify(products), 600);
    return products;
  }

  async findById(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new ResourceNotFoundException('ApiProduct', id);
    return product;
  }
}
