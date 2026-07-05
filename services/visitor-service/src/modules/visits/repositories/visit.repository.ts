import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitRequest } from '../../../database/entities/visit-request.entity';
import { VisitStatus } from '../../../common/enums';

@Injectable()
export class VisitRepository {
  constructor(@InjectRepository(VisitRequest) private readonly repo: Repository<VisitRequest>) {}

  create(data: Partial<VisitRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<VisitRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['visitor', 'site'] });
  }

  async findAll(page: number, limit: number, status?: VisitStatus, visitorId?: string, siteId?: string, hostId?: string) {
    const qb = this.repo.createQueryBuilder('v')
      .leftJoinAndSelect('v.visitor', 'visitor')
      .leftJoinAndSelect('v.site', 'site');
    if (status) qb.andWhere('v.status = :status', { status });
    if (visitorId) qb.andWhere('v.visitorId = :visitorId', { visitorId });
    if (siteId) qb.andWhere('v.siteId = :siteId', { siteId });
    if (hostId) qb.andWhere('v.hostId = :hostId', { hostId });
    const [data, total] = await qb.orderBy('v.scheduledAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findPending(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({
      where: { status: VisitStatus.PENDING },
      relations: ['visitor', 'site'],
      order: { scheduledAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return [data, total] as const;
  }
}
