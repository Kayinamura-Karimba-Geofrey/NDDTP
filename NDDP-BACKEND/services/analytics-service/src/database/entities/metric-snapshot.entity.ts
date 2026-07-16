import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { MetricDefinition } from './metric-definition.entity';

@Entity('metric_snapshots')
@Index('idx_metric_snapshots_metric_period', ['metricId', 'periodStart', 'periodEnd'])
export class MetricSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'metric_id', type: 'uuid' })
  metricId: string;

  @ManyToOne(() => MetricDefinition, (m) => m.snapshots)
  @JoinColumn({ name: 'metric_id' })
  metric: MetricDefinition;

  @Column({ name: 'period_start', type: 'timestamptz' })
  periodStart: Date;

  @Column({ name: 'period_end', type: 'timestamptz' })
  periodEnd: Date;

  @Column({ type: 'decimal', precision: 18, scale: 4 })
  value: number;

  @Column({ type: 'jsonb', nullable: true })
  dimensions: Record<string, unknown> | null;

  @Column({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
