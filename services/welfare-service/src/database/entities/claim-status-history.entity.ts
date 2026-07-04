import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { ClaimStatus } from '../../common/enums';
import { WelfareClaim } from './welfare-claim.entity';

@Entity('claim_status_history')
@Index('idx_claim_status_history_claim', ['claimId'])
export class ClaimStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'claim_id', type: 'uuid' })
  claimId: string;

  @Column({ name: 'from_status', type: 'enum', enum: ClaimStatus, nullable: true })
  fromStatus: ClaimStatus | null;

  @Column({ name: 'to_status', type: 'enum', enum: ClaimStatus })
  toStatus: ClaimStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => WelfareClaim, (c) => c.statusHistory)
  @JoinColumn({ name: 'claim_id' })
  claim: WelfareClaim;
}
