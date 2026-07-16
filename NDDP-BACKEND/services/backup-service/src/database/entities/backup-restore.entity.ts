import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { RestoreStatus } from '../../common/enums';
import { BackupJob } from './backup-job.entity';

@Entity('backup_restores')
@Index('idx_backup_restores_number', ['restoreNumber'], { unique: true })
export class BackupRestore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'restore_number', type: 'varchar', length: 50, unique: true })
  restoreNumber: string;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ type: 'enum', enum: RestoreStatus, default: RestoreStatus.PENDING })
  status: RestoreStatus;

  @Column({ name: 'target_path', type: 'varchar', length: 500, nullable: true })
  targetPath: string | null;

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

  @ManyToOne(() => BackupJob, (j) => j.restores)
  @JoinColumn({ name: 'job_id' })
  job: BackupJob;
}
