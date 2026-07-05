import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ExpenditureRepository } from './repositories/expenditure.repository';
import { FinanceTransactionRepository } from './repositories/finance-transaction.repository';
import { BudgetRepository } from '../budgets/repositories/budget.repository';
import { CostAccountRepository } from '../accounts/repositories/cost-account.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateExpenditureDto, RejectExpenditureDto } from './dto/expenditure.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException, InsufficientBudgetException,
} from '../../common/exceptions/finance.exceptions';
import { ExpenditureStatus, BudgetStatus, AccountStatus, TransactionType, ExpenditureReferenceType } from '../../common/enums';
import { EXPENDITURE_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ExpenditureService {
  private readonly logger = new Logger(ExpenditureService.name);

  constructor(
    private readonly repo: ExpenditureRepository,
    private readonly transactionRepo: FinanceTransactionRepository,
    private readonly budgetRepo: BudgetRepository,
    private readonly accountRepo: CostAccountRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(requestedBy: string, dto: CreateExpenditureDto) {
    const account = await this.accountRepo.findById(dto.accountId);
    if (!account) throw new ResourceNotFoundException('CostAccount', dto.accountId);
    if (account.status !== AccountStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Account is not active');
    }

    const budget = await this.budgetRepo.findById(dto.budgetId);
    if (!budget) throw new ResourceNotFoundException('BudgetAllocation', dto.budgetId);
    if (budget.accountId !== dto.accountId) {
      throw new BusinessRuleViolationException('Budget does not belong to the specified account');
    }

    const requestNumber = `EXP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const expenditure = await this.repo.create({
      requestNumber,
      accountId: dto.accountId,
      budgetId: dto.budgetId,
      requestedBy,
      amount: dto.amount.toFixed(2),
      purpose: dto.purpose,
      status: ExpenditureStatus.DRAFT,
      referenceType: dto.referenceType ?? ExpenditureReferenceType.MANUAL,
      referenceId: dto.referenceId ?? null,
    });

    this.logger.log(`Expenditure created: ${requestNumber}`);
    return this.repo.findById(expenditure.id);
  }

  async submit(id: string, userId: string) {
    const exp = await this.findById(id);
    if (exp.requestedBy !== userId) throw new BusinessRuleViolationException('You can only submit your own expenditures');
    this.assertTransition(exp.status, ExpenditureStatus.SUBMITTED);

    const budget = await this.budgetRepo.findById(exp.budgetId);
    if (!budget || budget.status !== BudgetStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Budget must be ACTIVE to submit expenditure');
    }

    const amount = parseFloat(exp.amount);
    if (this.budgetRepo.getAvailableAmount(budget) < amount) {
      throw new InsufficientBudgetException('Insufficient available budget for this expenditure');
    }

    await this.budgetRepo.adjustCommitted(exp.budgetId, amount);
    await this.repo.update(id, { status: ExpenditureStatus.SUBMITTED });
    await this.publisher.publishExpenditureSubmitted({
      expenditureId: id, requestNumber: exp.requestNumber, accountId: exp.accountId, amount: exp.amount, requestedBy: userId,
    });
    return this.repo.findById(id);
  }

  async approve(id: string, reviewerId: string) {
    const exp = await this.findById(id);
    this.assertTransition(exp.status, ExpenditureStatus.APPROVED);
    await this.repo.update(id, { status: ExpenditureStatus.APPROVED, reviewerId });
    await this.publisher.publishExpenditureApproved({
      expenditureId: id, requestNumber: exp.requestNumber, reviewerId, amount: exp.amount,
    });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectExpenditureDto) {
    const exp = await this.findById(id);
    this.assertTransition(exp.status, ExpenditureStatus.REJECTED);
    await this.budgetRepo.adjustCommitted(exp.budgetId, -parseFloat(exp.amount));
    await this.repo.update(id, { status: ExpenditureStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason });
    await this.publisher.publishExpenditureRejected({
      expenditureId: id, requestNumber: exp.requestNumber, reason: dto.rejectionReason,
    });
    return this.repo.findById(id);
  }

  async pay(id: string, userId: string) {
    const exp = await this.findById(id);
    this.assertTransition(exp.status, ExpenditureStatus.PAID);
    const amount = parseFloat(exp.amount);

    await this.budgetRepo.adjustSpent(exp.budgetId, -amount, amount);
    await this.repo.update(id, { status: ExpenditureStatus.PAID, paidAt: new Date() });

    const transactionNumber = `TXN-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    await this.transactionRepo.create({
      transactionNumber,
      expenditureId: id,
      accountId: exp.accountId,
      budgetId: exp.budgetId,
      amount: exp.amount,
      transactionType: TransactionType.DEBIT,
      recordedBy: userId,
      notes: `Payment for ${exp.requestNumber}`,
    });

    await this.publisher.publishExpenditurePaid({
      expenditureId: id, requestNumber: exp.requestNumber, amount: exp.amount, accountId: exp.accountId,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const exp = await this.findById(id);
    if (!isStaff && exp.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own expenditures');
    }
    this.assertTransition(exp.status, ExpenditureStatus.CANCELLED);

    if ([ExpenditureStatus.SUBMITTED, ExpenditureStatus.APPROVED].includes(exp.status)) {
      await this.budgetRepo.adjustCommitted(exp.budgetId, -parseFloat(exp.amount));
    }

    await this.repo.update(id, { status: ExpenditureStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: ExpenditureStatus; accountId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.accountId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findPending(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPending(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const exp = await this.repo.findById(id);
    if (!exp) throw new ResourceNotFoundException('ExpenditureRequest', id);
    return exp;
  }

  async findTransactions(id: string) {
    await this.findById(id);
    return this.transactionRepo.findByExpenditureId(id);
  }

  private assertTransition(from: ExpenditureStatus, to: ExpenditureStatus) {
    const allowed = EXPENDITURE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
