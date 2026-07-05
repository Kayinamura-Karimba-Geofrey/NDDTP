import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index,
} from 'typeorm';
import { AuthorizationDecision } from '../../common/enums';

@Entity('authorization_decision_logs')
@Index('idx_authz_decision_user_id', ['userId'])
@Index('idx_authz_decision_permission', ['permissionCode'])
@Index('idx_authz_decision_created_at', ['createdAt'])
export class AuthorizationDecisionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'permission_code', type: 'varchar', length: 150 })
  permissionCode: string;

  @Column({ type: 'enum', enum: AuthorizationDecision })
  decision: AuthorizationDecision;

  @Column({ name: 'matched_roles', type: 'jsonb', nullable: true })
  matchedRoles: string[] | null;

  @Column({ name: 'scope_type', type: 'varchar', length: 50, nullable: true })
  scopeType: string | null;

  @Column({ name: 'scope_id', type: 'uuid', nullable: true })
  scopeId: string | null;

  @Column({ name: 'resource_type', type: 'varchar', length: 100, nullable: true })
  resourceType: string | null;

  @Column({ name: 'resource_id', type: 'varchar', length: 255, nullable: true })
  resourceId: string | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'deny_reason', type: 'varchar', length: 255, nullable: true })
  denyReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
