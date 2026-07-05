import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AlertSeverity, AlertStatus } from '../../common/enums';
import { MonitoringCheck } from './monitoring-check.entity';

@Entity('monitoring_alerts')
@Index('idx_monitoring_alerts_number', ['alertNumber'], { unique: true })
export class MonitoringAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'alert_number', type: 'varchar', length: 50, unique: true })
  alertNumber: string;

  @Column({ name: 'check_id', type: 'uuid' })
  checkId: string;

  @Column({ type: 'enum', enum: AlertSeverity, default: AlertSeverity.WARNING })
  severity: AlertSeverity;

  @Column({ type: 'enum', enum: AlertStatus, default: AlertStatus.OPEN })
  status: AlertStatus;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'acknowledged_by', type: 'uuid', nullable: true })
  acknowledgedBy: string | null;

  @Column({ name: 'resolved_by', type: 'uuid', nullable: true })
  resolvedBy: string | null;

  @Column({ name: 'acknowledged_at', type: 'timestamptz', nullable: true })
  acknowledgedAt: Date | null;

  @Column({ name: 'resolved_at', type: 'timestamptz', nullable: true })
  resolvedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => MonitoringCheck, (c) => c.alerts)
  @JoinColumn({ name: 'check_id' })
  check: MonitoringCheck;
}
