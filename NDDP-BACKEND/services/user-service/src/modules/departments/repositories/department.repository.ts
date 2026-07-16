import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from '../../../database/entities/department.entity';
import { DepartmentStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class DepartmentRepository {
  constructor(@InjectRepository(Department) private readonly repo: Repository<Department>) {}

  create(data: Partial<Department>): Promise<Department> {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string): Promise<Department | null> {
    return this.repo.findOne({ where: { id, deletedAt: IsNull() }, relations: ['parent'] });
  }

  findByCode(code: string): Promise<Department | null> {
    return this.repo.findOne({ where: { code, deletedAt: IsNull() } });
  }

  async findAll(page: number, limit: number, search?: string, status?: DepartmentStatus): Promise<PaginatedResult<Department>> {
    const qb = this.repo.createQueryBuilder('d').where('d.deleted_at IS NULL');
    if (status) qb.andWhere('d.status = :status', { status });
    if (search) qb.andWhere('(d.code ILIKE :s OR d.name ILIKE :s)', { s: `%${search}%` });

    const [data, total] = await qb.orderBy('d.name').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Partial<Department>): Promise<void> {
    const { parent, users, ...updateData } = data as Department;
    return this.repo.update(id, updateData).then(() => undefined);
  }

  softDelete(id: string): Promise<void> {
    return this.repo.softDelete(id).then(() => undefined);
  }
}
