import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { NotificationTemplate } from '../../../database/entities/notification-template.entity';
import { TemplateStatus, NotificationChannel } from '../../../common/enums';
import { PaginatedResult } from '../../../common/interfaces';

@Injectable()
export class TemplateRepository {
  constructor(@InjectRepository(NotificationTemplate) private readonly repo: Repository<NotificationTemplate>) {}

  create(data: Partial<NotificationTemplate>) {
    return this.repo.save(this.repo.create(data));
  }

  findByCode(code: string) {
    return this.repo.findOne({ where: { code, deletedAt: IsNull(), status: TemplateStatus.ACTIVE } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id, deletedAt: IsNull() } });
  }

  async findAll(page: number, limit: number, channel?: NotificationChannel): Promise<PaginatedResult<NotificationTemplate>> {
    const qb = this.repo.createQueryBuilder('t').where('t.deleted_at IS NULL');
    if (channel) qb.andWhere('t.channel = :channel', { channel });
    const [data, total] = await qb.orderBy('t.code').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Record<string, unknown>) {
    return this.repo.update(id, data);
  }

  softDelete(id: string) {
    return this.repo.softDelete(id);
  }
}
