import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { InterviewStatus, InterviewType } from '../../common/enums';
import { Application } from './application.entity';

@Entity('interviews')
@Index('idx_interviews_application', ['applicationId'])
@Index('idx_interviews_scheduled', ['scheduledAt'])
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @Column({ type: 'enum', enum: InterviewType, default: InterviewType.IN_PERSON })
  type: InterviewType;

  @Column({ type: 'enum', enum: InterviewStatus, default: InterviewStatus.SCHEDULED })
  status: InterviewStatus;

  @Column({ name: 'scheduled_at', type: 'timestamptz' })
  scheduledAt: Date;

  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ name: 'interviewer_ids', type: 'jsonb', nullable: true })
  interviewerIds: string[] | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @Column({ type: 'int', nullable: true })
  rating: number | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @Column({ name: 'scheduled_by', type: 'uuid', nullable: true })
  scheduledBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Application, (a) => a.interviews)
  @JoinColumn({ name: 'application_id' })
  application: Application;
}
