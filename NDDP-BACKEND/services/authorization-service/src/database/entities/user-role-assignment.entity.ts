import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { AssignmentStatus, ScopeType } from '../../common/enums';
import { Role } from './role.entity';

@Entity('user_role_assignments')
@Index('idx_user_role_assignments_user_id', ['userId'])
@Index('idx_user_role_assignments_role_id', ['roleId'])
@Index('idx_user_role_assignments_status', ['status'])
@Index('idx_user_role_assignments_scope', ['scopeType', 'scopeId'])
export class UserRoleAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @Column({ name: 'scope_type', type: 'enum', enum: ScopeType, default: ScopeType.GLOBAL })
  scopeType: ScopeType;

  @Column({ name: 'scope_id', type: 'uuid', nullable: true })
  scopeId: string | null;

  @Column({ type: 'enum', enum: AssignmentStatus, default: AssignmentStatus.ACTIVE })
  status: AssignmentStatus;

  @Column({ name: 'assigned_by', type: 'uuid', nullable: true })
  assignedBy: string | null;

  @Column({ name: 'revoked_by', type: 'uuid', nullable: true })
  revokedBy: string | null;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @Column({ name: 'revoke_reason', type: 'varchar', length: 255, nullable: true })
  revokeReason: string | null;

  @CreateDateColumn({ name: 'assigned_at', type: 'timestamptz' })
  assignedAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.userAssignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
