import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceTransaction } from '../../../database/entities/finance-transaction.entity';

@Injectable()
export class FinanceTransactionRepository {
  constructor(@InjectRepository(FinanceTransaction) private readonly repo: Repository<FinanceTransaction>) {}

  create(data: Partial<FinanceTransaction>) { return this.repo.save(this.repo.create(data)); }

  findByExpenditureId(expenditureId: string) {
    return this.repo.find({ where: { expenditureId }, order: { recordedAt: 'ASC' } });
  }
}
