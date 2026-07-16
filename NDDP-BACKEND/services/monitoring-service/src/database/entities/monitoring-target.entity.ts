import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { TargetType, TargetStatus } from '../../common/enums';
import { MonitoringCheck } from './monitoring-check.entity';

@Entity('monitoring_targets')
@Index('idx_monitoring_targets_code', ['code'], { unique: true })
export class MonitoringTarget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'target_type', type: 'enum', enum: TargetType })
  targetType: TargetType;

  @Column({ name: 'endpoint_url', type: 'varchar', length: 500 })
  endpointUrl: string;

  @Column({ name: 'check_interval_seconds', type: 'int', default: 60 })
  checkIntervalSeconds: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: TargetStatus, default: TargetStatus.ACTIVE })
  status: TargetStatus;

  @OneToMany(() => MonitoringCheck, (c) => c.target)
  checks: MonitoringCheck[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
