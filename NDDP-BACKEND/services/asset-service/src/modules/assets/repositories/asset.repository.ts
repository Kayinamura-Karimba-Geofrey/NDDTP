import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../../../database/entities/asset.entity';
import { AssetStatus } from '../../../common/enums';

@Injectable()
export class AssetRepository {
  constructor(@InjectRepository(Asset) private readonly repo: Repository<Asset>) {}

  create(data: Partial<Asset>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Asset>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  findBySerial(serialNumber: string) {
    return this.repo.findOne({ where: { serialNumber } });
  }

  async findAll(page: number, limit: number, status?: AssetStatus, categoryId?: string, unitId?: string) {
    const qb = this.repo.createQueryBuilder('a').leftJoinAndSelect('a.category', 'category');
    if (status) qb.andWhere('a.status = :status', { status });
    if (categoryId) qb.andWhere('a.categoryId = :categoryId', { categoryId });
    if (unitId) qb.andWhere('a.unitId = :unitId', { unitId });
    const [data, total] = await qb.orderBy('a.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
