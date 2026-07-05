import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenditureRequest } from '../../../database/entities/expenditure-request.entity';
import { ExpenditureStatus } from '../../../common/enums';

@Injectable()
export class ExpenditureRepository {
  constructor(@InjectRepository(ExpenditureRequest) private readonly repo: Repository<ExpenditureRequest>) {}

  create(data: Partial<ExpenditureRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ExpenditureRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['account', 'account.category', 'budget'],
    });
  }

  async findAll(page: number, limit: number, status?: ExpenditureStatus, accountId?: string, requestedBy?: string) {
    const qb = this.repo.createQueryBuilder('e')
      .leftJoinAndSelect('e.account', 'account')
      .leftJoinAndSelect('e.budget', 'budget');
    if (status) qb.andWhere('e.status = :status', { status });
    if (accountId) qb.andWhere('e.accountId = :accountId', { accountId });
    if (requestedBy) qb.andWhere('e.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('e.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findPending(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({
      where: { status: ExpenditureStatus.SUBMITTED },
      relations: ['account', 'budget'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return [data, total] as const;
  }
}
