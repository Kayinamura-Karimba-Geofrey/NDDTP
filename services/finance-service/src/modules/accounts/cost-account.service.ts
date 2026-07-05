import { Injectable, Logger } from '@nestjs/common';
import { CostAccountRepository } from './repositories/cost-account.repository';
import { BudgetCategoryRepository } from '../categories/repositories/budget-category.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCostAccountDto } from './dto/cost-account.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/finance.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { AccountStatus } from '../../common/enums';

@Injectable()
export class CostAccountService {
  private readonly logger = new Logger(CostAccountService.name);

  constructor(
    private readonly repo: CostAccountRepository,
    private readonly categoryRepo: BudgetCategoryRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateCostAccountDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new ResourceNotFoundException('BudgetCategory', dto.categoryId);

    const account = await this.repo.create({
      code: dto.code,
      name: dto.name,
      categoryId: dto.categoryId,
      departmentId: dto.departmentId ?? null,
      status: AccountStatus.ACTIVE,
      description: dto.description ?? null,
    });

    await this.redis.del(CACHE_KEYS.ACCOUNTS);
    await this.publisher.publishAccountCreated({ accountId: account.id, code: account.code, categoryId: dto.categoryId });
    this.logger.log(`Cost account created: ${account.code}`);
    return this.repo.findById(account.id);
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ACCOUNTS);
    if (cached) return JSON.parse(cached);
    const accounts = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.ACCOUNTS, JSON.stringify(accounts), 600);
    return accounts;
  }

  findAll(filter: { page?: number; limit?: number; status?: AccountStatus; categoryId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.categoryId);
  }

  async findById(id: string) {
    const account = await this.repo.findById(id);
    if (!account) throw new ResourceNotFoundException('CostAccount', id);
    return account;
  }
}
