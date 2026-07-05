import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostAccount } from '../../../database/entities/cost-account.entity';
import { AccountStatus } from '../../../common/enums';

@Injectable()
export class CostAccountRepository {
  constructor(@InjectRepository(CostAccount) private readonly repo: Repository<CostAccount>) {}

  create(data: Partial<CostAccount>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['category'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }

  findActive() {
    return this.repo.find({ where: { status: AccountStatus.ACTIVE }, relations: ['category'], order: { name: 'ASC' } });
  }

  async findAll(page: number, limit: number, status?: AccountStatus, categoryId?: string) {
    const qb = this.repo.createQueryBuilder('a').leftJoinAndSelect('a.category', 'category');
    if (status) qb.andWhere('a.status = :status', { status });
    if (categoryId) qb.andWhere('a.categoryId = :categoryId', { categoryId });
    const [data, total] = await qb.orderBy('a.name', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
