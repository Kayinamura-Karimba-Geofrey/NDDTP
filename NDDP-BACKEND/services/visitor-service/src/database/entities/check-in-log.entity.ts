import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { CheckInType } from '../../common/enums';
import { VisitRequest } from './visit-request.entity';
import { VisitSite } from './visit-site.entity';

@Entity('check_in_logs')
@Index('idx_check_in_logs_visit', ['visitId'])
export class CheckInLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'visit_id', type: 'uuid' })
  visitId: string;

  @Column({ name: 'site_id', type: 'uuid' })
  siteId: string;

  @Column({ name: 'check_type', type: 'enum', enum: CheckInType })
  checkType: CheckInType;

  @Column({ name: 'recorded_by', type: 'uuid' })
  recordedBy: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;

  @ManyToOne(() => VisitRequest)
  @JoinColumn({ name: 'visit_id' })
  visit: VisitRequest;

  @ManyToOne(() => VisitSite)
  @JoinColumn({ name: 'site_id' })
  site: VisitSite;
}
