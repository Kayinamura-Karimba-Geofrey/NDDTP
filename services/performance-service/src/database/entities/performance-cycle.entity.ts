import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany,
} from 'typeorm';
import { CycleType, CycleStatus } from '../../common/enums';
import { PerformanceGoal } from './performance-goal.entity';
import { PerformanceReview } from './performance-review.entity';

@Entity('performance_cycles')
@Index('idx_performance_cycles_code', ['code'], { unique: true })
export class PerformanceCycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: CycleType })
  type: CycleType;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ type: 'enum', enum: CycleStatus, default: CycleStatus.PLANNED })
  status: CycleStatus;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => PerformanceGoal, (g) => g.cycle)
  goals: PerformanceGoal[];

  @OneToMany(() => PerformanceReview, (r) => r.cycle)
  reviews: PerformanceReview[];
}
