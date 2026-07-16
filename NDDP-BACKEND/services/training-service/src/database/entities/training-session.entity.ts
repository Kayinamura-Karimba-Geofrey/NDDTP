import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { SessionStatus } from '../../common/enums';
import { TrainingCourse } from './training-course.entity';
import { TrainingEnrollment } from './training-enrollment.entity';

@Entity('training_sessions')
@Index('idx_training_sessions_course', ['courseId'])
@Index('idx_training_sessions_status', ['status'])
export class TrainingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'session_code', type: 'varchar', length: 50, unique: true })
  sessionCode: string;

  @Column({ name: 'course_id', type: 'uuid' })
  courseId: string;

  @Column({ name: 'instructor_id', type: 'uuid', nullable: true })
  instructorId: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.SCHEDULED })
  status: SessionStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => TrainingCourse, (c) => c.sessions)
  @JoinColumn({ name: 'course_id' })
  course: TrainingCourse;

  @OneToMany(() => TrainingEnrollment, (e) => e.session)
  enrollments: TrainingEnrollment[];
}
