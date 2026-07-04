import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { EnrollmentStatus } from '../../common/enums';
import { TrainingSession } from './training-session.entity';
import { SessionAttendance } from './session-attendance.entity';

@Entity('training_enrollments')
@Index('idx_training_enrollments_user', ['userId'])
@Index('idx_training_enrollments_session', ['sessionId'])
@Index('idx_training_enrollments_status', ['status'])
export class TrainingEnrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'enrollment_number', type: 'varchar', length: 50, unique: true })
  enrollmentNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'session_id', type: 'uuid' })
  sessionId: string;

  @Column({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.PENDING })
  status: EnrollmentStatus;

  @Column({ type: 'text', nullable: true })
  justification: string | null;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score: number | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => TrainingSession, (s) => s.enrollments)
  @JoinColumn({ name: 'session_id' })
  session: TrainingSession;

  @OneToMany(() => SessionAttendance, (a) => a.enrollment)
  attendance: SessionAttendance[];
}
