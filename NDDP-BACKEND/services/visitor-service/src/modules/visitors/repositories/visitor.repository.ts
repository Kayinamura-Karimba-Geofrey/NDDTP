import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from '../../../database/entities/visitor.entity';
import { VisitorStatus } from '../../../common/enums';

@Injectable()
export class VisitorRepository {
  constructor(@InjectRepository(Visitor) private readonly repo: Repository<Visitor>) {}

  create(data: Partial<Visitor>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByIdNumber(idNumber: string) { return this.repo.findOne({ where: { idNumber } }); }

  async findAll(page: number, limit: number, status?: VisitorStatus) {
    const qb = this.repo.createQueryBuilder('v');
    if (status) qb.andWhere('v.status = :status', { status });
    const [data, total] = await qb.orderBy('v.lastName', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
