import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { MetricDomain, AggregationType, MetricStatus } from '../../common/enums';
import { MetricSnapshot } from './metric-snapshot.entity';

@Entity('metric_definitions')
@Index('idx_metric_definitions_code', ['code'], { unique: true })
export class MetricDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: MetricDomain })
  domain: MetricDomain;

  @Column({ name: 'aggregation_type', type: 'enum', enum: AggregationType })
  aggregationType: AggregationType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: MetricStatus, default: MetricStatus.ACTIVE })
  status: MetricStatus;

  @OneToMany(() => MetricSnapshot, (s) => s.metric)
  snapshots: MetricSnapshot[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
