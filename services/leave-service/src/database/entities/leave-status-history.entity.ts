import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { LeaveRequestStatus } from '../../common/enums';
import { LeaveRequest } from './leave-request.entity';

@Entity('leave_status_history')
@Index('idx_leave_status_history_request', ['leaveRequestId'])
export class LeaveStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'leave_request_id', type: 'uuid' })
  leaveRequestId: string;

  @Column({ name: 'from_status', type: 'enum', enum: LeaveRequestStatus, nullable: true })
  fromStatus: LeaveRequestStatus | null;

  @Column({ name: 'to_status', type: 'enum', enum: LeaveRequestStatus })
  toStatus: LeaveRequestStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => LeaveRequest, (r) => r.statusHistory)
  @JoinColumn({ name: 'leave_request_id' })
  leaveRequest: LeaveRequest;
}
