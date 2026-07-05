import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { QueryStatus } from '../../common/enums';

@Entity('analytics_queries')
@Index('idx_analytics_queries_status', ['status'])
@Index('idx_analytics_queries_number', ['queryNumber'], { unique: true })
export class AnalyticsQuery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'query_number', type: 'varchar', length: 50, unique: true })
  queryNumber: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ type: 'enum', enum: QueryStatus, default: QueryStatus.PENDING })
  status: QueryStatus;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  result: Record<string, unknown> | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
