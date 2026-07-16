import { Injectable, Logger } from '@nestjs/common';
import { BudgetCategoryRepository } from './repositories/budget-category.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateBudgetCategoryDto } from './dto/budget-category.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/finance.exceptions';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class BudgetCategoryService {
  private readonly logger = new Logger(BudgetCategoryService.name);

  constructor(
    private readonly repo: BudgetCategoryRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateBudgetCategoryDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const category = await this.repo.create({
      code: dto.code,
      name: dto.name,
      categoryType: dto.categoryType,
      description: dto.description ?? null,
      isActive: true,
    });

    await this.redis.del(CACHE_KEYS.CATEGORIES);
    await this.publisher.publishCategoryCreated({ categoryId: category.id, code: category.code });
    this.logger.log(`Budget category created: ${category.code}`);
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
    if (!category) throw new ResourceNotFoundException('BudgetCategory', id);
    return category;
  }
}
