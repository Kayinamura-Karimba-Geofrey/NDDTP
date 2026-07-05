import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { VisitStatus } from '../../common/enums';
import { Visitor } from './visitor.entity';
import { VisitSite } from './visit-site.entity';

@Entity('visit_requests')
@Index('idx_visit_requests_number', ['visitNumber'], { unique: true })
export class VisitRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'visit_number', type: 'varchar', length: 50, unique: true })
  visitNumber: string;

  @Column({ name: 'visitor_id', type: 'uuid' })
  visitorId: string;

  @Column({ name: 'site_id', type: 'uuid' })
  siteId: string;

  @Column({ name: 'host_id', type: 'uuid' })
  hostId: string;

  @Column({ type: 'varchar', length: 300 })
  purpose: string;

  @Column({ name: 'scheduled_at', type: 'timestamptz' })
  scheduledAt: Date;

  @Column({ name: 'expected_departure', type: 'timestamptz', nullable: true })
  expectedDeparture: Date | null;

  @Column({ type: 'enum', enum: VisitStatus, default: VisitStatus.PENDING })
  status: VisitStatus;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Visitor)
  @JoinColumn({ name: 'visitor_id' })
  visitor: Visitor;

  @ManyToOne(() => VisitSite)
  @JoinColumn({ name: 'site_id' })
  site: VisitSite;
}
