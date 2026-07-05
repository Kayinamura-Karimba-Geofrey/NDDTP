import { Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCategoryDto } from './dto/category.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/announcement.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { CategoryStatus } from '../../common/enums';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    private readonly repo: CategoryRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateCategoryDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const category = await this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description ?? null,
      status: CategoryStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.CATEGORIES);
    await this.publisher.publishCategoryCreated({ categoryId: category.id, code: category.code });
    this.logger.log(`Category created: ${category.code}`);
    return category;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.CATEGORIES);
    if (cached) return JSON.parse(cached);
    const categories = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.CATEGORIES, JSON.stringify(categories), 600);
    return categories;
  }

  async findById(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new ResourceNotFoundException('AnnouncementCategory', id);
    return category;
  }
}
