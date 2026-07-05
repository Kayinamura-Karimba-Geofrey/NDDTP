import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from '../../../database/entities/calendar-event.entity';
import { EventStatus } from '../../../common/enums';

@Injectable()
export class CalendarEventRepository {
  constructor(@InjectRepository(CalendarEvent) private readonly repo: Repository<CalendarEvent>) {}

  create(data: Partial<CalendarEvent>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<CalendarEvent>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['calendar'] });
  }

  async findAll(page: number, limit: number, calendarId?: string, status?: EventStatus, from?: Date, to?: Date, createdBy?: string) {
    const qb = this.repo.createQueryBuilder('e').leftJoinAndSelect('e.calendar', 'calendar');
    if (calendarId) qb.andWhere('e.calendarId = :calendarId', { calendarId });
    if (status) qb.andWhere('e.status = :status', { status });
    if (from) qb.andWhere('e.endTime >= :from', { from });
    if (to) qb.andWhere('e.startTime <= :to', { to });
    if (createdBy) qb.andWhere('e.createdBy = :createdBy', { createdBy });
    const [data, total] = await qb.orderBy('e.startTime', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  countConflicts(calendarId: string, startTime: Date, endTime: Date, excludeId?: string) {
    const qb = this.repo.createQueryBuilder('e')
      .where('e.calendarId = :calendarId', { calendarId })
      .andWhere('e.status IN (:...active)', { active: [EventStatus.SCHEDULED] })
      .andWhere('e.startTime < :endTime AND e.endTime > :startTime', { startTime, endTime });
    if (excludeId) qb.andWhere('e.id != :excludeId', { excludeId });
    return qb.getCount();
  }
}
