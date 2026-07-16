import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany,
} from 'typeorm';
import { CourseCategory, CourseStatus } from '../../common/enums';
import { TrainingSession } from './training-session.entity';

@Entity('training_courses')
@Index('idx_training_courses_code', ['code'], { unique: true })
export class TrainingCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: CourseCategory })
  category: CourseCategory;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'duration_days', type: 'int', default: 1 })
  durationDays: number;

  @Column({ name: 'max_participants', type: 'int', default: 0 })
  maxParticipants: number;

  @Column({ type: 'jsonb', nullable: true })
  prerequisites: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.ACTIVE })
  status: CourseStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => TrainingSession, (s) => s.course)
  sessions: TrainingSession[];
}
