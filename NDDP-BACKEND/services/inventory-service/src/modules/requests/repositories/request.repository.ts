import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockRequest } from '../../../database/entities/stock-request.entity';
import { RequestStatus } from '../../../common/enums';

@Injectable()
export class RequestRepository {
  constructor(@InjectRepository(StockRequest) private readonly repo: Repository<StockRequest>) {}

  create(data: Partial<StockRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<StockRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['warehouse', 'item'] });
  }

  async findAll(page: number, limit: number, status?: RequestStatus, requestedBy?: string) {
    const qb = this.repo.createQueryBuilder('r')
      .leftJoinAndSelect('r.warehouse', 'warehouse')
      .leftJoinAndSelect('r.item', 'item');
    if (status) qb.andWhere('r.status = :status', { status });
    if (requestedBy) qb.andWhere('r.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPending(page: number, limit: number) {
    return this.repo.findAndCount({
      where: { status: RequestStatus.PENDING },
      relations: ['warehouse', 'item'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
