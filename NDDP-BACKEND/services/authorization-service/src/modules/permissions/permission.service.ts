import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './repositories/permission.repository';
import { CreatePermissionDto, UpdatePermissionDto, PermissionFilterDto } from './dto/permission.dto';
import {
  DuplicateResourceException,
  ResourceNotFoundException,
  SystemResourceException,
} from '../../common/exceptions/authorization.exceptions';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { PermissionStatus } from '../../common/enums';
import { Permission } from '../../database/entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreatePermissionDto, correlationId?: string) {
    const existing = await this.permissionRepository.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const permission = await this.permissionRepository.create({
      ...dto,
      isSystem: false,
      status: PermissionStatus.ACTIVE,
    });

    await this.eventPublisher.publishPermissionCreated(
      { permissionId: permission.id, code: permission.code },
      correlationId,
    );

    return this.toResponse(permission);
  }

  async findAll(filter: PermissionFilterDto) {
    const result = await this.permissionRepository.findAll(
      filter.page || 1,
      filter.limit || 20,
      filter.module,
      filter.search,
    );
    return { data: result.data.map((p: Permission) => this.toResponse(p)), meta: result.meta };
  }

  async findById(id: string) {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) throw new ResourceNotFoundException('Permission', id);
    return this.toResponse(permission);
  }

  async update(id: string, dto: UpdatePermissionDto, correlationId?: string) {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) throw new ResourceNotFoundException('Permission', id);
    if (permission.isSystem) throw new SystemResourceException('permission', 'modify');

    await this.permissionRepository.update(id, dto);
    await this.redisService.delPattern('authz:*');

    await this.eventPublisher.publishPermissionUpdated({ permissionId: id, changes: dto }, correlationId);
    return this.findById(id);
  }

  async delete(id: string, correlationId?: string) {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) throw new ResourceNotFoundException('Permission', id);
    if (permission.isSystem) throw new SystemResourceException('permission', 'delete');

    await this.permissionRepository.softDelete(id);
    await this.redisService.delPattern('authz:*');

    await this.eventPublisher.publishPermissionDeleted(
      { permissionId: id, code: permission.code },
      correlationId,
    );
    return { message: 'Permission deleted successfully' };
  }

  private toResponse(p: { id: string; code: string; name: string; module: string; action: string; resource: string; isSystem: boolean; status: PermissionStatus }) {
    return {
      id: p.id,
      code: p.code,
      name: p.name,
      module: p.module,
      action: p.action,
      resource: p.resource,
      isSystem: p.isSystem,
      status: p.status,
    };
  }
}
