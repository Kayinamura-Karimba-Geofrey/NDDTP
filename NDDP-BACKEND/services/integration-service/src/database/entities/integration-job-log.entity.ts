import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { LogLevel } from '../../common/enums';
import { IntegrationJob } from './integration-job.entity';

@Entity('integration_job_logs')
@Index('idx_integration_job_logs_job', ['jobId'])
export class IntegrationJobLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ type: 'enum', enum: LogLevel, default: LogLevel.INFO })
  level: LogLevel;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => IntegrationJob, (j) => j.logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: IntegrationJob;
}
