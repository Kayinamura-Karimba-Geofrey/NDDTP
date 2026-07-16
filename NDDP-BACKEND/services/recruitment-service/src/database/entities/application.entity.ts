import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { ApplicationStatus } from '../../common/enums';
import { JobPosting } from './job-posting.entity';
import { Candidate } from './candidate.entity';
import { ApplicationStatusHistory } from './application-status-history.entity';
import { Interview } from './interview.entity';

@Entity('applications')
@Index('idx_applications_posting', ['jobPostingId'])
@Index('idx_applications_candidate', ['candidateId'])
@Index('idx_applications_status', ['status'])
@Index('idx_applications_unique', ['jobPostingId', 'candidateId'], { unique: true })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_posting_id', type: 'uuid' })
  jobPostingId: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @Column({ name: 'application_number', type: 'varchar', length: 50, unique: true })
  applicationNumber: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.SUBMITTED })
  status: ApplicationStatus;

  @Column({ name: 'cover_letter', type: 'text', nullable: true })
  coverLetter: string | null;

  @Column({ name: 'assigned_recruiter_id', type: 'uuid', nullable: true })
  assignedRecruiterId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ name: 'hired_at', type: 'timestamptz', nullable: true })
  hiredAt: Date | null;

  @Column({ name: 'submitted_at', type: 'timestamptz' })
  submittedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => JobPosting, (jp) => jp.applications)
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;

  @ManyToOne(() => Candidate, (c) => c.applications)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @OneToMany(() => ApplicationStatusHistory, (h) => h.application)
  statusHistory: ApplicationStatusHistory[];

  @OneToMany(() => Interview, (i) => i.application)
  interviews: Interview[];
}
