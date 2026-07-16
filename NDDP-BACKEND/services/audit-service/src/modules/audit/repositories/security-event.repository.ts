import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { SecurityEvent } from '../../../database/entities/security-event.entity';
import { SecurityEventType, AuditSeverity } from '../../../common/enums';

export interface SecurityEventSearchFilters {
  userId?: string;
  eventType?: SecurityEventType;
  severity?: AuditSeverity;
  isResolved?: boolean;
  fromDate?: Date;
  toDate?: Date;
}

@Injectable()
export class SecurityEventRepository {
  constructor(@InjectRepository(SecurityEvent) private readonly repo: Repository<SecurityEvent>) {}

  create(data: Partial<SecurityEvent>): SecurityEvent {
    return this.repo.create(data);
  }

  save(event: SecurityEvent): Promise<SecurityEvent> {
    return this.repo.save(event);
  }

  findById(id: string): Promise<SecurityEvent | null> {
    return this.repo.findOne({ where: { id } });
  }

  async search(filters: SecurityEventSearchFilters, page: number, limit: number) {
    const qb = this.repo.createQueryBuilder('event');
    if (filters.userId) qb.andWhere('event.userId = :userId', { userId: filters.userId });
    if (filters.eventType) qb.andWhere('event.eventType = :eventType', { eventType: filters.eventType });
    if (filters.severity) qb.andWhere('event.severity = :severity', { severity: filters.severity });
    if (filters.isResolved !== undefined) qb.andWhere('event.isResolved = :isResolved', { isResolved: filters.isResolved });
    if (filters.fromDate) qb.andWhere('event.createdAt >= :fromDate', { fromDate: filters.fromDate });
    if (filters.toDate) qb.andWhere('event.createdAt <= :toDate', { toDate: filters.toDate });

    const [data, total] = await qb
      .orderBy('event.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total };
  }

  deleteOlderThan(date: Date): Promise<number> {
    return this.repo.delete({ createdAt: LessThan(date), isResolved: true }).then((r) => r.affected ?? 0);
  }
}
