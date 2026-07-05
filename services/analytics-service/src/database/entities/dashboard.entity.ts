import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { DashboardStatus } from '../../common/enums';

@Entity('dashboards')
@Index('idx_dashboards_code', ['code'], { unique: true })
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ type: 'enum', enum: DashboardStatus, default: DashboardStatus.DRAFT })
  status: DashboardStatus;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  widgets: Array<{
    metricId: string;
    title: string;
    chartType: string;
    position: { row: number; col: number; width: number; height: number };
  }>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
