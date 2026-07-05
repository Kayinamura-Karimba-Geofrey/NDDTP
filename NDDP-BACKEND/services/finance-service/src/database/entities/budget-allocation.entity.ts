import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BudgetStatus } from '../../common/enums';
import { CostAccount } from './cost-account.entity';

@Entity('budget_allocations')
@Index('idx_budget_allocations_account_year', ['accountId', 'fiscalYear'], { unique: true })
export class BudgetAllocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column({ name: 'fiscal_year', type: 'int' })
  fiscalYear: number;

  @Column({ name: 'allocated_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  allocatedAmount: string;

  @Column({ name: 'committed_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  committedAmount: string;

  @Column({ name: 'spent_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  spentAmount: string;

  @Column({ type: 'enum', enum: BudgetStatus, default: BudgetStatus.DRAFT })
  status: BudgetStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => CostAccount)
  @JoinColumn({ name: 'account_id' })
  account: CostAccount;
}
