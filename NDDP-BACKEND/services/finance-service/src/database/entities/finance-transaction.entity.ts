import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from '../../common/enums';
import { ExpenditureRequest } from './expenditure-request.entity';
import { CostAccount } from './cost-account.entity';
import { BudgetAllocation } from './budget-allocation.entity';

@Entity('finance_transactions')
@Index('idx_finance_transactions_number', ['transactionNumber'], { unique: true })
export class FinanceTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'transaction_number', type: 'varchar', length: 50, unique: true })
  transactionNumber: string;

  @Column({ name: 'expenditure_id', type: 'uuid' })
  expenditureId: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column({ name: 'budget_id', type: 'uuid' })
  budgetId: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;

  @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType, default: TransactionType.DEBIT })
  transactionType: TransactionType;

  @Column({ name: 'recorded_by', type: 'uuid' })
  recordedBy: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;

  @ManyToOne(() => ExpenditureRequest)
  @JoinColumn({ name: 'expenditure_id' })
  expenditure: ExpenditureRequest;

  @ManyToOne(() => CostAccount)
  @JoinColumn({ name: 'account_id' })
  account: CostAccount;

  @ManyToOne(() => BudgetAllocation)
  @JoinColumn({ name: 'budget_id' })
  budget: BudgetAllocation;
}
