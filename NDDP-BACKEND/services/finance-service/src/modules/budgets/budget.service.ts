import { Injectable, Logger } from '@nestjs/common';
import { BudgetRepository } from './repositories/budget.repository';
import { CostAccountRepository } from '../accounts/repositories/cost-account.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateBudgetDto } from './dto/budget.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/finance.exceptions';
import { AccountStatus, BudgetStatus } from '../../common/enums';

@Injectable()
export class BudgetService {
  private readonly logger = new Logger(BudgetService.name);

  constructor(
    private readonly repo: BudgetRepository,
    private readonly accountRepo: CostAccountRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateBudgetDto) {
    const account = await this.accountRepo.findById(dto.accountId);
    if (!account) throw new ResourceNotFoundException('CostAccount', dto.accountId);
    if (account.status !== AccountStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Cannot allocate budget to inactive account');
    }

    const existing = await this.repo.findByAccountAndYear(dto.accountId, dto.fiscalYear);
    if (existing) throw new DuplicateResourceException('fiscalYear', `${dto.fiscalYear} for account`);

    const budget = await this.repo.create({
      accountId: dto.accountId,
      fiscalYear: dto.fiscalYear,
      allocatedAmount: dto.allocatedAmount.toFixed(2),
      committedAmount: '0.00',
      spentAmount: '0.00',
      status: BudgetStatus.DRAFT,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishBudgetAllocated({
      budgetId: budget.id, accountId: dto.accountId, fiscalYear: dto.fiscalYear, allocatedAmount: dto.allocatedAmount,
    });
    this.logger.log(`Budget allocated for ${dto.fiscalYear}: ${budget.id}`);
    return this.repo.findById(budget.id);
  }

  async activate(id: string) {
    const budget = await this.findById(id);
    if (budget.status !== BudgetStatus.DRAFT) {
      throw new BusinessRuleViolationException('Only DRAFT budgets can be activated');
    }
    await this.repo.update(id, { status: BudgetStatus.ACTIVE });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: BudgetStatus; accountId?: string; fiscalYear?: number }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.accountId, filter.fiscalYear);
  }

  async findById(id: string) {
    const budget = await this.repo.findById(id);
    if (!budget) throw new ResourceNotFoundException('BudgetAllocation', id);
    return budget;
  }

  async getAvailable(id: string) {
    const budget = await this.findById(id);
    return { budgetId: id, availableAmount: this.repo.getAvailableAmount(budget) };
  }
}
