import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleRepository } from './repositories/role.repository';
import { RolePermissionRepository } from './repositories/role-permission.repository';
import { CreateRoleDto, UpdateRoleDto, RoleFilterDto } from './dto/role.dto';
import {
  DuplicateResourceException,
  ResourceNotFoundException,
  SystemResourceException,
} from '../../common/exceptions/authorization.exceptions';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { RoleStatus } from '../../common/enums';
import { Role } from '../../database/entities/role.entity';
import { RolePermission } from '../../database/entities/role-permission.entity';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateRoleDto, createdBy?: string, correlationId?: string) {
    const existing = await this.roleRepository.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    if (dto.parentRoleId) {
      const parent = await this.roleRepository.findById(dto.parentRoleId);
      if (!parent) throw new ResourceNotFoundException('Role', dto.parentRoleId);
    }

    const role = await this.roleRepository.create({
      code: dto.code,
      name: dto.name,
      description: dto.description || null,
      parentRoleId: dto.parentRoleId || null,
      priority: dto.priority ?? 0,
      isSystem: false,
      status: RoleStatus.ACTIVE,
    });

    await this.eventPublisher.publishRoleCreated(
      { roleId: role.id, code: role.code, name: role.name, createdBy },
      correlationId,
    );

    return this.toResponse(role);
  }

  async findAll(filter: RoleFilterDto) {
    const result = await this.roleRepository.findAll(
      filter.page || 1,
      filter.limit || 20,
      filter.search,
      filter.status,
    );
    return { data: result.data.map((r: Role) => this.toResponse(r)), meta: result.meta };
  }

  async findById(id: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new ResourceNotFoundException('Role', id);

    const permissions = role.rolePermissions?.map((rp: RolePermission & { permission: { id: string; code: string; name: string } }) => ({
      id: rp.permission.id,
      code: rp.permission.code,
      name: rp.permission.name,
    })) || [];

    return { ...this.toResponse(role), permissions };
  }

  async update(id: string, dto: UpdateRoleDto, correlationId?: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new ResourceNotFoundException('Role', id);
    if (role.isSystem && dto.status === RoleStatus.INACTIVE) {
      throw new SystemResourceException('role', 'deactivate');
    }

    await this.roleRepository.update(id, {
      name: dto.name,
      description: dto.description,
      parentRoleId: dto.parentRoleId,
      priority: dto.priority,
      status: dto.status,
    });

    await this.redisService.del(CACHE_KEYS.ROLE(id));
    await this.redisService.delPattern('authz:user:*');

    await this.eventPublisher.publishRoleUpdated({ roleId: id, changes: dto }, correlationId);
    return this.findById(id);
  }

  async delete(id: string, correlationId?: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new ResourceNotFoundException('Role', id);
    if (role.isSystem) throw new SystemResourceException('role', 'delete');

    await this.rolePermissionRepository.revokeAll(id);
    await this.roleRepository.softDelete(id);
    await this.redisService.delPattern('authz:*');

    await this.eventPublisher.publishRoleDeleted({ roleId: id, code: role.code }, correlationId);
    return { message: 'Role deleted successfully' };
  }

  async grantPermissions(roleId: string, permissionIds: string[], grantedBy?: string, correlationId?: string) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw new ResourceNotFoundException('Role', roleId);

    await this.rolePermissionRepository.grant(roleId, permissionIds, grantedBy);
    await this.redisService.del(CACHE_KEYS.ROLE_PERMISSIONS(roleId));
    await this.redisService.delPattern('authz:user:*');

    await this.eventPublisher.publishPermissionGranted(
      { roleId, permissionIds, grantedBy },
      correlationId,
    );

    return this.findById(roleId);
  }

  async revokePermissions(roleId: string, permissionIds: string[], correlationId?: string) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) throw new ResourceNotFoundException('Role', roleId);

    await this.rolePermissionRepository.revoke(roleId, permissionIds);
    await this.redisService.del(CACHE_KEYS.ROLE_PERMISSIONS(roleId));
    await this.redisService.delPattern('authz:user:*');

    await this.eventPublisher.publishPermissionRevoked({ roleId, permissionIds }, correlationId);
    return this.findById(roleId);
  }

  private toResponse(role: { id: string; code: string; name: string; description: string | null; parentRoleId: string | null; isSystem: boolean; status: RoleStatus; priority: number; createdAt: Date }) {
    return {
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      parentRoleId: role.parentRoleId,
      isSystem: role.isSystem,
      status: role.status,
      priority: role.priority,
      createdAt: role.createdAt,
    };
  }
}
