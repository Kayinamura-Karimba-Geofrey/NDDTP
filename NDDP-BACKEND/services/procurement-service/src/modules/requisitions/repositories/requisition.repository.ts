import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRequisition } from '../../../database/entities/purchase-requisition.entity';
import { RequisitionItem } from '../../../database/entities/requisition-item.entity';
import { RequisitionStatus } from '../../../common/enums';

@Injectable()
export class RequisitionRepository {
  constructor(
    @InjectRepository(PurchaseRequisition) private readonly reqRepo: Repository<PurchaseRequisition>,
    @InjectRepository(RequisitionItem) private readonly itemRepo: Repository<RequisitionItem>,
  ) {}

  async createWithItems(req: Partial<PurchaseRequisition>, items: Partial<RequisitionItem>[]) {
    const saved = await this.reqRepo.save(this.reqRepo.create(req));
    if (items.length) {
      await this.itemRepo.save(items.map((i) => this.itemRepo.create({ ...i, requisitionId: saved.id })));
    }
    return this.findById(saved.id);
  }

  update(id: string, data: Partial<PurchaseRequisition>) {
    return this.reqRepo.update(id, data as Record<string, unknown>);
  }

  findById(id: string) {
    return this.reqRepo.findOne({ where: { id }, relations: ['items'] });
  }

  async findAll(page: number, limit: number, status?: RequisitionStatus, requestedBy?: string) {
    const qb = this.reqRepo.createQueryBuilder('r').leftJoinAndSelect('r.items', 'items');
    if (status) qb.andWhere('r.status = :status', { status });
    if (requestedBy) qb.andWhere('r.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPending(page: number, limit: number) {
    return this.reqRepo.findAndCount({
      where: { status: RequisitionStatus.SUBMITTED },
      relations: ['items'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
