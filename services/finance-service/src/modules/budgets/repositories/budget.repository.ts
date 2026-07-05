import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetAllocation } from '../../../database/entities/budget-allocation.entity';
import { BudgetStatus } from '../../../common/enums';

@Injectable()
export class BudgetRepository {
  constructor(@InjectRepository(BudgetAllocation) private readonly repo: Repository<BudgetAllocation>) {}

  create(data: Partial<BudgetAllocation>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<BudgetAllocation>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['account', 'account.category'] });
  }

  findByAccountAndYear(accountId: string, fiscalYear: number) {
    return this.repo.findOne({ where: { accountId, fiscalYear } });
  }

  async findAll(page: number, limit: number, status?: BudgetStatus, accountId?: string, fiscalYear?: number) {
    const qb = this.repo.createQueryBuilder('b')
      .leftJoinAndSelect('b.account', 'account')
      .leftJoinAndSelect('account.category', 'category');
    if (status) qb.andWhere('b.status = :status', { status });
    if (accountId) qb.andWhere('b.accountId = :accountId', { accountId });
    if (fiscalYear) qb.andWhere('b.fiscalYear = :fiscalYear', { fiscalYear });
    const [data, total] = await qb.orderBy('b.fiscalYear', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async adjustCommitted(id: string, delta: number) {
    const budget = await this.findById(id);
    if (!budget) return null;
    const committed = parseFloat(budget.committedAmount) + delta;
    await this.repo.update(id, { committedAmount: committed.toFixed(2) });
    return this.findById(id);
  }

  async adjustSpent(id: string, committedDelta: number, spentDelta: number) {
    const budget = await this.findById(id);
    if (!budget) return null;
    const committed = parseFloat(budget.committedAmount) + committedDelta;
    const spent = parseFloat(budget.spentAmount) + spentDelta;
    await this.repo.update(id, { committedAmount: committed.toFixed(2), spentAmount: spent.toFixed(2) });
    return this.findById(id);
  }

  getAvailableAmount(budget: BudgetAllocation): number {
    return parseFloat(budget.allocatedAmount) - parseFloat(budget.committedAmount) - parseFloat(budget.spentAmount);
  }
}
