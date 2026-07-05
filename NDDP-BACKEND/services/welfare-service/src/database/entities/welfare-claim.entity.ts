import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn, OneToMany, OneToOne,
} from 'typeorm';
import { ClaimStatus } from '../../common/enums';
import { WelfareProgram } from './welfare-program.entity';
import { Dependent } from './dependent.entity';
import { ClaimStatusHistory } from './claim-status-history.entity';
import { Disbursement } from './disbursement.entity';

@Entity('welfare_claims')
@Index('idx_welfare_claims_user', ['userId'])
@Index('idx_welfare_claims_status', ['status'])
@Index('idx_welfare_claims_number', ['claimNumber'], { unique: true })
export class WelfareClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'claim_number', type: 'varchar', length: 50, unique: true })
  claimNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'program_id', type: 'uuid' })
  programId: string;

  @Column({ name: 'dependent_id', type: 'uuid', nullable: true })
  dependentId: string | null;

  @Column({ name: 'requested_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  requestedAmount: number;

  @Column({ name: 'approved_amount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  approvedAmount: number | null;

  @Column({ type: 'text' })
  justification: string;

  @Column({ type: 'enum', enum: ClaimStatus, default: ClaimStatus.DRAFT })
  status: ClaimStatus;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  attachments: Record<string, unknown>[] | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => WelfareProgram, (p) => p.claims)
  @JoinColumn({ name: 'program_id' })
  program: WelfareProgram;

  @ManyToOne(() => Dependent, { nullable: true })
  @JoinColumn({ name: 'dependent_id' })
  dependent: Dependent | null;

  @OneToMany(() => ClaimStatusHistory, (h) => h.claim)
  statusHistory: ClaimStatusHistory[];

  @OneToOne(() => Disbursement, (d) => d.claim)
  disbursement: Disbursement;
}
