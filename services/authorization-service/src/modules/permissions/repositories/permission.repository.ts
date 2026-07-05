import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Permission } from '../../../database/entities/permission.entity';
import { PermissionStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class PermissionRepository {
  constructor(@InjectRepository(Permission) private readonly repo: Repository<Permission>) {}

  create(data: Partial<Permission>): Promise<Permission> {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string): Promise<Permission | null> {
    return this.repo.findOne({ where: { id, deletedAt: IsNull() } });
  }

  findByCode(code: string): Promise<Permission | null> {
    return this.repo.findOne({ where: { code, deletedAt: IsNull() } });
  }

  findByCodes(codes: string[]): Promise<Permission[]> {
    return this.repo.find({ where: { code: In(codes), deletedAt: IsNull(), status: PermissionStatus.ACTIVE } });
  }

  async findAll(page: number, limit: number, module?: string, search?: string): Promise<PaginatedResult<Permission>> {
    const qb = this.repo.createQueryBuilder('p').where('p.deleted_at IS NULL');
    if (module) qb.andWhere('p.module = :module', { module });
    if (search) qb.andWhere('(p.code ILIKE :s OR p.name ILIKE :s)', { s: `%${search}%` });

    const [data, total] = await qb.orderBy('p.module').addOrderBy('p.code')
      .skip((page - 1) * limit).take(limit).getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Partial<Permission>): Promise<void> {
    return this.repo.update(id, data).then(() => undefined);
  }

  softDelete(id: string): Promise<void> {
    return this.repo.softDelete(id).then(() => undefined);
  }
}
