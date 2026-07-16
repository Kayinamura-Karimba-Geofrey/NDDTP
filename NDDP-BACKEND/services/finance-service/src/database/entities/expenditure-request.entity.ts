import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ExpenditureStatus, ExpenditureReferenceType } from '../../common/enums';
import { CostAccount } from './cost-account.entity';
import { BudgetAllocation } from './budget-allocation.entity';

@Entity('expenditure_requests')
@Index('idx_expenditure_requests_number', ['requestNumber'], { unique: true })
export class ExpenditureRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'request_number', type: 'varchar', length: 50, unique: true })
  requestNumber: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column({ name: 'budget_id', type: 'uuid' })
  budgetId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 300 })
  purpose: string;

  @Column({ type: 'enum', enum: ExpenditureStatus, default: ExpenditureStatus.DRAFT })
  status: ExpenditureStatus;

  @Column({ name: 'reference_type', type: 'enum', enum: ExpenditureReferenceType, default: ExpenditureReferenceType.MANUAL })
  referenceType: ExpenditureReferenceType;

  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  referenceId: string | null;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => CostAccount)
  @JoinColumn({ name: 'account_id' })
  account: CostAccount;

  @ManyToOne(() => BudgetAllocation)
  @JoinColumn({ name: 'budget_id' })
  budget: BudgetAllocation;
}
