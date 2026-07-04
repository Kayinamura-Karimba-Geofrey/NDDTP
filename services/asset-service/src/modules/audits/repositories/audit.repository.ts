import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetAudit } from '../../../database/entities/asset-audit.entity';

@Injectable()
export class AuditRepository {
  constructor(@InjectRepository(AssetAudit) private readonly repo: Repository<AssetAudit>) {}

  create(data: Partial<AssetAudit>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<AssetAudit>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  async findAll(page: number, limit: number, unitId?: string) {
    const qb = this.repo.createQueryBuilder('a');
    if (unitId) qb.andWhere('a.unitId = :unitId', { unitId });
    const [data, total] = await qb.orderBy('a.auditDate', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
