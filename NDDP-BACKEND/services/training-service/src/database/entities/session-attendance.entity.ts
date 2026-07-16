import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { AttendanceStatus } from '../../common/enums';
import { TrainingEnrollment } from './training-enrollment.entity';

@Entity('session_attendance')
@Index('idx_session_attendance_enrollment', ['enrollmentId'])
@Index('idx_session_attendance_date', ['attendanceDate'])
export class SessionAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'enrollment_id', type: 'uuid' })
  enrollmentId: string;

  @Column({ name: 'attendance_date', type: 'date' })
  attendanceDate: string;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'recorded_by', type: 'uuid' })
  recordedBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => TrainingEnrollment, (e) => e.attendance)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: TrainingEnrollment;
}
