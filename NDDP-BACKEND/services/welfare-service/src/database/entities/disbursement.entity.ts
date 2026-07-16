import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, OneToOne, JoinColumn,
} from 'typeorm';
import { DisbursementStatus } from '../../common/enums';
import { WelfareClaim } from './welfare-claim.entity';

@Entity('disbursements')
@Index('idx_disbursements_claim', ['claimId'], { unique: true })
export class Disbursement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'claim_id', type: 'uuid', unique: true })
  claimId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: DisbursementStatus, default: DisbursementStatus.PENDING })
  status: DisbursementStatus;

  @Column({ name: 'payment_reference', type: 'varchar', length: 100, nullable: true })
  paymentReference: string | null;

  @Column({ name: 'processed_by', type: 'uuid', nullable: true })
  processedBy: string | null;

  @Column({ name: 'processed_at', type: 'timestamptz', nullable: true })
  processedAt: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => WelfareClaim, (c) => c.disbursement)
  @JoinColumn({ name: 'claim_id' })
  claim: WelfareClaim;
}
