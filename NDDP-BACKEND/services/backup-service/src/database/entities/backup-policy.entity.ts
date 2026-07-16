import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { BackupType, TargetType, PolicyStatus } from '../../common/enums';
import { BackupJob } from './backup-job.entity';

@Entity('backup_policies')
@Index('idx_backup_policies_code', ['code'], { unique: true })
export class BackupPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'backup_type', type: 'enum', enum: BackupType })
  backupType: BackupType;

  @Column({ name: 'target_type', type: 'enum', enum: TargetType })
  targetType: TargetType;

  @Column({ type: 'varchar', length: 100 })
  schedule: string;

  @Column({ name: 'retention_days', type: 'int', default: 30 })
  retentionDays: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: PolicyStatus, default: PolicyStatus.ACTIVE })
  status: PolicyStatus;

  @OneToMany(() => BackupJob, (j) => j.policy)
  jobs: BackupJob[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
