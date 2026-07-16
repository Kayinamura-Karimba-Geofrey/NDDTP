import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { ApplicationStatus } from '../../common/enums';
import { Application } from './application.entity';

@Entity('application_status_history')
@Index('idx_app_status_history_app', ['applicationId'])
export class ApplicationStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @Column({ name: 'from_status', type: 'enum', enum: ApplicationStatus, nullable: true })
  fromStatus: ApplicationStatus | null;

  @Column({ name: 'to_status', type: 'enum', enum: ApplicationStatus })
  toStatus: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Application, (a) => a.statusHistory)
  @JoinColumn({ name: 'application_id' })
  application: Application;
}
