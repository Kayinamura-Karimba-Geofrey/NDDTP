import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleAssignmentRepository } from './repositories/user-role-assignment.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { AssignRoleDto, AssignmentFilterDto } from './dto/assignment.dto';
import {
  AssignmentConflictException,
  ResourceNotFoundException,
} from '../../common/exceptions/authorization.exceptions';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { AssignmentStatus, ScopeType } from '../../common/enums';
import { UserRoleAssignment } from '../../database/entities/user-role-assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly assignmentRepository: UserRoleAssignmentRepository,
    private readonly roleRepository: RoleRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async assignRole(dto: AssignRoleDto, assignedBy?: string, correlationId?: string) {
    const role = await this.roleRepository.findById(dto.roleId);
    if (!role) throw new ResourceNotFoundException('Role', dto.roleId);

    const scopeType = dto.scopeType || ScopeType.GLOBAL;
    const existing = await this.assignmentRepository.findExisting(
      dto.userId,
      dto.roleId,
      scopeType,
      dto.scopeId,
    );

    if (existing) {
      throw new AssignmentConflictException('User already has this role assignment');
    }

    const assignment = await this.assignmentRepository.create({
      userId: dto.userId,
      roleId: dto.roleId,
      scopeType,
      scopeId: dto.scopeId || null,
      assignedBy: assignedBy || null,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      status: AssignmentStatus.ACTIVE,
    });

    await this.invalidateUserCache(dto.userId);

    await this.eventPublisher.publishRoleAssigned(
      {
        userId: dto.userId,
        roleId: dto.roleId,
        roleCode: role.code,
        scopeType,
        scopeId: dto.scopeId,
        assignedBy,
      },
      correlationId,
    );

    return this.toResponse(assignment, role.code, role.name);
  }

  async assignDefaultRole(userId: string, correlationId?: string) {
    const defaultCode = this.configService.get<string>('app.defaultRoleCode') || 'EMPLOYEE';
    const role = await this.roleRepository.findByCode(defaultCode);
    if (!role) return null;

    const existing = await this.assignmentRepository.findExisting(userId, role.id, ScopeType.GLOBAL);
    if (existing) return existing;

    return this.assignRole({ userId, roleId: role.id }, undefined, correlationId);
  }

  async revokeAssignment(assignmentId: string, revokedBy: string, reason?: string, correlationId?: string) {
    const assignment = await this.assignmentRepository.findById(assignmentId);
    if (!assignment) throw new ResourceNotFoundException('Assignment', assignmentId);

    await this.assignmentRepository.revoke(assignmentId, revokedBy, reason || 'Revoked by administrator');
    await this.invalidateUserCache(assignment.userId);

    await this.eventPublisher.publishRoleRevoked(
      {
        userId: assignment.userId,
        roleId: assignment.roleId,
        assignmentId,
        revokedBy,
        reason,
      },
      correlationId,
    );

    return { message: 'Role assignment revoked successfully' };
  }

  async revokeAllUserRoles(userId: string, revokedBy: string, reason: string, correlationId?: string) {
    await this.assignmentRepository.revokeAllByUserId(userId, revokedBy, reason);
    await this.invalidateUserCache(userId);

    await this.eventPublisher.publishRoleRevoked({ userId, reason, revokedAll: true }, correlationId);
    return { message: 'All role assignments revoked' };
  }

  async getUserAssignments(userId: string, filter: AssignmentFilterDto) {
    const result = await this.assignmentRepository.findByUserIdPaginated(
      userId,
      filter.page || 1,
      filter.limit || 20,
    );

    return {
      data: result.data.map((a: UserRoleAssignment) =>
        this.toResponse(a, a.role?.code || '', a.role?.name || ''),
      ),
      meta: result.meta,
    };
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    await this.redisService.del(CACHE_KEYS.USER_PERMISSIONS(userId));
    await this.redisService.del(CACHE_KEYS.USER_ROLES(userId));
  }

  private toResponse(
    a: { id: string; userId: string; scopeType: ScopeType; status: AssignmentStatus; assignedAt: Date; expiresAt: Date | null },
    roleCode: string,
    roleName: string,
  ) {
    return {
      id: a.id,
      userId: a.userId,
      roleCode,
      roleName,
      scopeType: a.scopeType,
      status: a.status,
      assignedAt: a.assignedAt,
      expiresAt: a.expiresAt,
    };
  }
}
