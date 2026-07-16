import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceRequest } from '../../../database/entities/maintenance-request.entity';
import { AssetReferenceType, RequestStatus } from '../../../common/enums';

@Injectable()
export class RequestRepository {
  constructor(@InjectRepository(MaintenanceRequest) private readonly repo: Repository<MaintenanceRequest>) {}

  create(data: Partial<MaintenanceRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MaintenanceRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async findAll(page: number, limit: number, status?: RequestStatus, assetType?: AssetReferenceType, requestedBy?: string) {
    const qb = this.repo.createQueryBuilder('r').leftJoinAndSelect('r.category', 'category');
    if (status) qb.andWhere('r.status = :status', { status });
    if (assetType) qb.andWhere('r.assetType = :assetType', { assetType });
    if (requestedBy) qb.andWhere('r.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPending(page: number, limit: number) {
    return this.repo.findAndCount({
      where: { status: RequestStatus.SUBMITTED },
      relations: ['category'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
