import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobStatus } from '../../common/enums';
import { IntegrationConnector } from './integration-connector.entity';
import { IntegrationEndpoint } from './integration-endpoint.entity';
import { IntegrationJobLog } from './integration-job-log.entity';

@Entity('integration_jobs')
@Index('idx_integration_jobs_number', ['jobNumber'], { unique: true })
export class IntegrationJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_number', type: 'varchar', length: 50, unique: true })
  jobNumber: string;

  @Column({ name: 'connector_id', type: 'uuid' })
  connectorId: string;

  @Column({ name: 'endpoint_id', type: 'uuid' })
  endpointId: string;

  @Column({ name: 'submitted_by', type: 'uuid' })
  submittedBy: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.PENDING })
  status: JobStatus;

  @Column({ type: 'jsonb', nullable: true })
  payload: Record<string, unknown> | null;

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

  @ManyToOne(() => IntegrationConnector)
  @JoinColumn({ name: 'connector_id' })
  connector: IntegrationConnector;

  @ManyToOne(() => IntegrationEndpoint)
  @JoinColumn({ name: 'endpoint_id' })
  endpoint: IntegrationEndpoint;

  @OneToMany(() => IntegrationJobLog, (l) => l.job)
  logs: IntegrationJobLog[];
}
