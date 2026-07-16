import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobStatus } from '../../common/enums';
import { BackupPolicy } from './backup-policy.entity';
import { BackupRestore } from './backup-restore.entity';

@Entity('backup_jobs')
@Index('idx_backup_jobs_number', ['jobNumber'], { unique: true })
export class BackupJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_number', type: 'varchar', length: 50, unique: true })
  jobNumber: string;

  @Column({ name: 'policy_id', type: 'uuid' })
  policyId: string;

  @Column({ name: 'initiated_by', type: 'uuid' })
  initiatedBy: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.PENDING })
  status: JobStatus;

  @Column({ name: 'backup_path', type: 'varchar', length: 500, nullable: true })
  backupPath: string | null;

  @Column({ name: 'size_bytes', type: 'bigint', nullable: true })
  sizeBytes: string | null;

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

  @ManyToOne(() => BackupPolicy, (p) => p.jobs)
  @JoinColumn({ name: 'policy_id' })
  policy: BackupPolicy;

  @OneToMany(() => BackupRestore, (r) => r.job)
  restores: BackupRestore[];
}
