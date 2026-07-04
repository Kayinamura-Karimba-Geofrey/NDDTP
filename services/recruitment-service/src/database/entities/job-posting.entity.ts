import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, Index, OneToMany,
} from 'typeorm';
import { JobPostingStatus, EmploymentType } from '../../common/enums';
import { Application } from './application.entity';

@Entity('job_postings')
@Index('idx_job_postings_status', ['status'])
@Index('idx_job_postings_reference', ['referenceNumber'], { unique: true })
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'reference_number', type: 'varchar', length: 50, unique: true })
  referenceNumber: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 150 })
  department: string;

  @Column({ name: 'employment_type', type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME })
  employmentType: EmploymentType;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  requirements: string[] | null;

  @Column({ name: 'positions_available', type: 'int', default: 1 })
  positionsAvailable: number;

  @Column({ name: 'positions_filled', type: 'int', default: 0 })
  positionsFilled: number;

  @Column({ type: 'enum', enum: JobPostingStatus, default: JobPostingStatus.DRAFT })
  status: JobPostingStatus;

  @Column({ name: 'closing_date', type: 'date', nullable: true })
  closingDate: string | null;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Application, (a) => a.jobPosting)
  applications: Application[];
}
