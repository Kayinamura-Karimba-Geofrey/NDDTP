import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, Index, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { RoleStatus } from '../../common/enums';
import { RolePermission } from './role-permission.entity';
import { UserRoleAssignment } from './user-role-assignment.entity';

@Entity('roles')
@Index('idx_roles_code', ['code'], { unique: true })
@Index('idx_roles_status', ['status'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'parent_role_id', type: 'uuid', nullable: true })
  parentRoleId: string | null;

  @Column({ name: 'is_system', type: 'boolean', default: false })
  isSystem: boolean;

  @Column({ type: 'enum', enum: RoleStatus, default: RoleStatus.ACTIVE })
  status: RoleStatus;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Role, (role) => role.childRoles, { nullable: true })
  @JoinColumn({ name: 'parent_role_id' })
  parentRole: Role | null;

  @OneToMany(() => Role, (role) => role.parentRole)
  childRoles: Role[];

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => UserRoleAssignment, (ura) => ura.role)
  userAssignments: UserRoleAssignment[];
}
