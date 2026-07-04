import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { LeaveRequestStatus } from '../../common/enums';
import { LeaveType } from './leave-type.entity';
import { LeaveApproval } from './leave-approval.entity';
import { LeaveStatusHistory } from './leave-status-history.entity';

@Entity('leave_requests')
@Index('idx_leave_requests_user', ['userId'])
@Index('idx_leave_requests_status', ['status'])
@Index('idx_leave_requests_dates', ['startDate', 'endDate'])
@Index('idx_leave_requests_number', ['requestNumber'], { unique: true })
export class LeaveRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'request_number', type: 'varchar', length: 50, unique: true })
  requestNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'leave_type_id', type: 'uuid' })
  leaveTypeId: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ name: 'total_days', type: 'decimal', precision: 6, scale: 2 })
  totalDays: number;

  @Column({ type: 'text', nullable: true })
  reason: string | null;

  @Column({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.DRAFT })
  status: LeaveRequestStatus;

  @Column({ name: 'approver_id', type: 'uuid', nullable: true })
  approverId: string | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;

  @OneToMany(() => LeaveApproval, (a) => a.leaveRequest)
  approvals: LeaveApproval[];

  @OneToMany(() => LeaveStatusHistory, (h) => h.leaveRequest)
  statusHistory: LeaveStatusHistory[];
}
