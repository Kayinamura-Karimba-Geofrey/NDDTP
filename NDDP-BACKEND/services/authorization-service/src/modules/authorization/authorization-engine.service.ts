import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleAssignmentRepository } from '../assignments/repositories/user-role-assignment.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { RolePermissionRepository } from '../roles/repositories/role-permission.repository';
import { AuthorizationDecisionLogRepository } from './repositories/authorization-decision-log.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { AuthorizationDecision, ScopeType } from '../../common/enums';
import { AuthorizationCheckResult, EffectivePermissions } from '../../common/interfaces';
import { BulkCheckPermissionDto, CheckPermissionDto } from './dto/authorization.dto';

@Injectable()
export class AuthorizationEngineService {
  private readonly logger = new Logger(AuthorizationEngineService.name);

  constructor(
    private readonly assignmentRepository: UserRoleAssignmentRepository,
    private readonly roleRepository: RoleRepository,
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly decisionLogRepository: AuthorizationDecisionLogRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async checkPermission(
    userId: string,
    permission: string,
    options?: {
      scopeType?: ScopeType;
      scopeId?: string;
      resourceType?: string;
      resourceId?: string;
      ipAddress?: string;
      logDecision?: boolean;
      correlationId?: string;
    },
  ): Promise<AuthorizationCheckResult> {
    const effective = await this.getEffectivePermissions(userId, options?.scopeType, options?.scopeId);

    const allowed = effective.permissions.includes(permission) ||
      effective.permissions.includes('*') ||
      effective.roles.includes('SUPER_ADMIN');

    const matchedRoles = allowed
      ? await this.getMatchingRoles(userId, permission, options?.scopeType, options?.scopeId)
      : [];

    const result: AuthorizationCheckResult = {
      allowed,
      userId,
      permission,
      matchedRoles,
      reason: allowed ? undefined : 'Permission not granted to user roles',
    };

    if (options?.logDecision !== false) {
      await this.decisionLogRepository.log({
        userId,
        permissionCode: permission,
        decision: allowed ? AuthorizationDecision.ALLOW : AuthorizationDecision.DENY,
        matchedRoles: matchedRoles.length ? matchedRoles : null,
        scopeType: options?.scopeType || null,
        scopeId: options?.scopeId || null,
        resourceType: options?.resourceType || null,
        resourceId: options?.resourceId || null,
        ipAddress: options?.ipAddress || null,
        denyReason: allowed ? null : result.reason || null,
      });

      if (!allowed) {
        await this.eventPublisher.publishAccessDenied(
          { userId, permission, reason: result.reason },
          options?.correlationId,
        );
      }
    }

    return result;
  }

  async bulkCheck(userId: string, dto: BulkCheckPermissionDto): Promise<AuthorizationCheckResult[]> {
    return Promise.all(
      dto.permissions.map((permission) => this.checkPermission(userId, permission, { logDecision: false })),
    );
  }

  async getEffectivePermissions(
    userId: string,
    scopeType?: ScopeType,
    scopeId?: string,
  ): Promise<EffectivePermissions> {
    const cacheKey = CACHE_KEYS.USER_PERMISSIONS(userId);
    const cached = await this.redisService.get(cacheKey);

    if (cached && !scopeType) {
      try {
        return JSON.parse(cached) as EffectivePermissions;
      } catch {
        await this.redisService.del(cacheKey);
      }
    }

    const assignments = await this.assignmentRepository.findActiveByUserId(userId, scopeType, scopeId);
    const roleIds = new Set<string>();
    const roleCodes: string[] = [];

    for (const assignment of assignments) {
      roleIds.add(assignment.roleId);
      roleCodes.push(assignment.role.code);

      const ancestors = await this.roleRepository.findAncestors(assignment.roleId);
      for (const ancestor of ancestors) {
        roleIds.add(ancestor.id);
        roleCodes.push(ancestor.code);
      }
    }

    const permissions = await this.rolePermissionRepository.findPermissionCodesByRoleIds([...roleIds]);

    const result: EffectivePermissions = {
      userId,
      roles: [...new Set(roleCodes)],
      permissions: [...new Set(permissions)],
      computedAt: new Date().toISOString(),
    };

    if (!scopeType) {
      const ttl = this.configService.get<number>('redis.ttl.userPermissions') || 900;
      await this.redisService.set(cacheKey, JSON.stringify(result), ttl);
    }

    return result;
  }

  async checkFromDto(dto: CheckPermissionDto, requestUserId: string, ipAddress?: string, correlationId?: string) {
    const userId = dto.userId || requestUserId;
    return this.checkPermission(userId, dto.permission, {
      scopeType: dto.scopeType,
      scopeId: dto.scopeId,
      resourceType: dto.resourceType,
      resourceId: dto.resourceId,
      ipAddress,
      correlationId,
    });
  }

  private async getMatchingRoles(
    userId: string,
    permission: string,
    scopeType?: ScopeType,
    scopeId?: string,
  ): Promise<string[]> {
    const assignments = await this.assignmentRepository.findActiveByUserId(userId, scopeType, scopeId);
    const matched: string[] = [];

    for (const assignment of assignments) {
      const rolePerms = await this.rolePermissionRepository.findByRoleId(assignment.roleId);
      const codes = rolePerms.map((rp) => rp.permission?.code).filter(Boolean);
      if (codes.includes(permission)) matched.push(assignment.role.code);

      const ancestors = await this.roleRepository.findAncestors(assignment.roleId);
      for (const ancestor of ancestors) {
        const ancestorPerms = await this.rolePermissionRepository.findByRoleId(ancestor.id);
        if (ancestorPerms.some((rp) => rp.permission?.code === permission)) {
          matched.push(ancestor.code);
        }
      }
    }

    return [...new Set(matched)];
  }
}
