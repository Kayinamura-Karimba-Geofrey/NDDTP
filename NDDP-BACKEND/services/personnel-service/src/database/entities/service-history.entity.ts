import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { ServiceEventType } from '../../common/enums';
import { PersonnelRecord } from './personnel-record.entity';

@Entity('service_history')
@Index('idx_service_history_personnel', ['personnelRecordId'])
@Index('idx_service_history_event_date', ['eventDate'])
export class ServiceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personnel_record_id', type: 'uuid' })
  personnelRecordId: string;

  @Column({ name: 'event_type', type: 'enum', enum: ServiceEventType })
  eventType: ServiceEventType;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'event_date', type: 'date' })
  eventDate: string;

  @Column({ name: 'reference_number', type: 'varchar', length: 100, nullable: true })
  referenceNumber: string | null;

  @Column({ name: 'recorded_by', type: 'uuid', nullable: true })
  recordedBy: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => PersonnelRecord, (pr) => pr.serviceHistory)
  @JoinColumn({ name: 'personnel_record_id' })
  personnelRecord: PersonnelRecord;
}
