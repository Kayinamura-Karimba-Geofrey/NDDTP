import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { AccrualType } from '../../common/enums';

@Entity('leave_types')
@Index('idx_leave_types_code', ['code'], { unique: true })
export class LeaveType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'default_days', type: 'decimal', precision: 6, scale: 2, default: 0 })
  defaultDays: number;

  @Column({ name: 'accrual_type', type: 'enum', enum: AccrualType, default: AccrualType.ANNUAL })
  accrualType: AccrualType;

  @Column({ name: 'requires_approval', type: 'boolean', default: true })
  requiresApproval: boolean;

  @Column({ name: 'max_consecutive_days', type: 'int', nullable: true })
  maxConsecutiveDays: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
