import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { LeaveApprovalDecision } from '../../common/enums';
import { LeaveRequest } from './leave-request.entity';

@Entity('leave_approvals')
@Index('idx_leave_approvals_request', ['leaveRequestId'])
export class LeaveApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'leave_request_id', type: 'uuid' })
  leaveRequestId: string;

  @Column({ name: 'approver_id', type: 'uuid' })
  approverId: string;

  @Column({ type: 'enum', enum: LeaveApprovalDecision })
  decision: LeaveApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => LeaveRequest, (r) => r.approvals)
  @JoinColumn({ name: 'leave_request_id' })
  leaveRequest: LeaveRequest;
}
