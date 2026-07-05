import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { PersonnelRecord } from './personnel-record.entity';
import { Rank } from './rank.entity';

@Entity('rank_history')
@Index('idx_rank_history_personnel', ['personnelRecordId'])
@Index('idx_rank_history_current', ['isCurrent'])
export class RankHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personnel_record_id', type: 'uuid' })
  personnelRecordId: string;

  @Column({ name: 'rank_id', type: 'uuid' })
  rankId: string;

  @Column({ name: 'effective_date', type: 'date' })
  effectiveDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string | null;

  @Column({ name: 'order_number', type: 'varchar', length: 100, nullable: true })
  orderNumber: string | null;

  @Column({ name: 'is_current', type: 'boolean', default: true })
  isCurrent: boolean;

  @Column({ name: 'promoted_by', type: 'uuid', nullable: true })
  promotedBy: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => PersonnelRecord, (pr) => pr.rankHistory)
  @JoinColumn({ name: 'personnel_record_id' })
  personnelRecord: PersonnelRecord;

  @ManyToOne(() => Rank)
  @JoinColumn({ name: 'rank_id' })
  rank: Rank;
}
