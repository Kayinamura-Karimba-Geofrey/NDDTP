import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Role } from '../../../database/entities/role.entity';
import { RoleStatus } from '../../../common/enums';
import { PaginatedResult } from '../../../common/interfaces';

@Injectable()
export class RoleRepository {
  constructor(@InjectRepository(Role) private readonly repo: Repository<Role>) {}

  create(data: Partial<Role>): Promise<Role> {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string): Promise<Role | null> {
    return this.repo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['rolePermissions', 'rolePermissions.permission', 'parentRole'],
    });
  }

  findByCode(code: string): Promise<Role | null> {
    return this.repo.findOne({ where: { code, deletedAt: IsNull() } });
  }

  async findAll(page: number, limit: number, search?: string, status?: RoleStatus): Promise<PaginatedResult<Role>> {
    const where: Record<string, unknown> = { deletedAt: IsNull() };
    if (status) where.status = status;

    const qb = this.repo.createQueryBuilder('role').where('role.deleted_at IS NULL');
    if (status) qb.andWhere('role.status = :status', { status });
    if (search) qb.andWhere('(role.code ILIKE :s OR role.name ILIKE :s)', { s: `%${search}%` });

    const [data, total] = await qb
      .orderBy('role.priority', 'DESC')
      .addOrderBy('role.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Partial<Role>): Promise<void> {
    return this.repo.update(id, data).then(() => undefined);
  }

  softDelete(id: string): Promise<void> {
    return this.repo.softDelete(id).then(() => undefined);
  }

  async findAncestors(roleId: string): Promise<Role[]> {
    const ancestors: Role[] = [];
    let current = await this.findById(roleId);

    while (current?.parentRoleId) {
      const parent = await this.findById(current.parentRoleId);
      if (!parent) break;
      ancestors.push(parent);
      current = parent;
    }
    return ancestors;
  }

  findChildren(parentRoleId: string): Promise<Role[]> {
    return this.repo.find({ where: { parentRoleId, deletedAt: IsNull(), status: RoleStatus.ACTIVE } });
  }
}
