import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { LeaveType } from './leave-type.entity';

@Entity('leave_balances')
@Index('idx_leave_balances_user', ['userId'])
@Index('idx_leave_balances_unique', ['userId', 'leaveTypeId', 'year'], { unique: true })
export class LeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'leave_type_id', type: 'uuid' })
  leaveTypeId: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ name: 'total_days', type: 'decimal', precision: 6, scale: 2, default: 0 })
  totalDays: number;

  @Column({ name: 'used_days', type: 'decimal', precision: 6, scale: 2, default: 0 })
  usedDays: number;

  @Column({ name: 'pending_days', type: 'decimal', precision: 6, scale: 2, default: 0 })
  pendingDays: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;
}
