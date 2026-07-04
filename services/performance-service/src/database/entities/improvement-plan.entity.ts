import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { PlanStatus } from '../../common/enums';

@Entity('improvement_plans')
@Index('idx_improvement_plans_user', ['userId'])
@Index('idx_improvement_plans_status', ['status'])
export class ImprovementPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'plan_number', type: 'varchar', length: 50, unique: true })
  planNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'review_id', type: 'uuid', nullable: true })
  reviewId: string | null;

  @Column({ name: 'manager_id', type: 'uuid' })
  managerId: string;

  @Column({ type: 'enum', enum: PlanStatus, default: PlanStatus.DRAFT })
  status: PlanStatus;

  @Column({ type: 'text' })
  objectives: string;

  @Column({ type: 'text', nullable: true })
  milestones: string | null;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ name: 'activated_at', type: 'timestamptz', nullable: true })
  activatedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
