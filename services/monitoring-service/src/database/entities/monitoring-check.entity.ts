import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CheckStatus } from '../../common/enums';
import { MonitoringTarget } from './monitoring-target.entity';
import { MonitoringAlert } from './monitoring-alert.entity';

@Entity('monitoring_checks')
@Index('idx_monitoring_checks_number', ['checkNumber'], { unique: true })
export class MonitoringCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'check_number', type: 'varchar', length: 50, unique: true })
  checkNumber: string;

  @Column({ name: 'target_id', type: 'uuid' })
  targetId: string;

  @Column({ name: 'initiated_by', type: 'uuid' })
  initiatedBy: string;

  @Column({ type: 'enum', enum: CheckStatus, default: CheckStatus.PENDING })
  status: CheckStatus;

  @Column({ name: 'response_time_ms', type: 'int', nullable: true })
  responseTimeMs: number | null;

  @Column({ name: 'status_code', type: 'int', nullable: true })
  statusCode: number | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => MonitoringTarget, (t) => t.checks)
  @JoinColumn({ name: 'target_id' })
  target: MonitoringTarget;

  @OneToMany(() => MonitoringAlert, (a) => a.check)
  alerts: MonitoringAlert[];
}
