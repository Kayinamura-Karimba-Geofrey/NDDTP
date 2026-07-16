import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { GoalStatus } from '../../common/enums';
import { PerformanceCycle } from './performance-cycle.entity';

@Entity('performance_goals')
@Index('idx_performance_goals_user', ['userId'])
@Index('idx_performance_goals_cycle', ['cycleId'])
export class PerformanceGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'cycle_id', type: 'uuid' })
  cycleId: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'target_date', type: 'date', nullable: true })
  targetDate: string | null;

  @Column({ type: 'enum', enum: GoalStatus, default: GoalStatus.DRAFT })
  status: GoalStatus;

  @Column({ name: 'progress_percent', type: 'int', default: 0 })
  progressPercent: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => PerformanceCycle, (c) => c.goals)
  @JoinColumn({ name: 'cycle_id' })
  cycle: PerformanceCycle;
}
