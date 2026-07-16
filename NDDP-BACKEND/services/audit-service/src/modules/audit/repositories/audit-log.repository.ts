import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, LessThan } from 'typeorm';
import { AuditLog } from '../../../database/entities/audit-log.entity';
import { AuditAction, AuditOutcome, AuditSeverity } from '../../../common/enums';

export interface AuditLogSearchFilters {
  userId?: string;
  eventType?: string;
  category?: string;
  action?: AuditAction;
  outcome?: AuditOutcome;
  severity?: AuditSeverity;
  resourceType?: string;
  resourceId?: string;
  correlationId?: string;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
}

@Injectable()
export class AuditLogRepository {
  constructor(@InjectRepository(AuditLog) private readonly repo: Repository<AuditLog>) {}

  create(data: Partial<AuditLog>): AuditLog {
    return this.repo.create(data);
  }

  save(log: AuditLog): Promise<AuditLog> {
    return this.repo.save(log);
  }

  findById(id: string): Promise<AuditLog | null> {
    return this.repo.findOne({ where: { id } });
  }

  findLatestHash(): Promise<string | null> {
    return this.repo
      .createQueryBuilder('log')
      .select('log.integrityHash')
      .orderBy('log.createdAt', 'DESC')
      .limit(1)
      .getOne()
      .then((r) => r?.integrityHash ?? null);
  }

  async search(filters: AuditLogSearchFilters, page: number, limit: number) {
    const qb = this.buildSearchQuery(filters);
    const [data, total] = await qb
      .orderBy('log.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total };
  }

  findByUserId(userId: string, page: number, limit: number) {
    return this.search({ userId }, page, limit);
  }

  findByResource(resourceType: string, resourceId: string, page: number, limit: number) {
    return this.search({ resourceType, resourceId }, page, limit);
  }

  deleteOlderThan(date: Date, category?: string): Promise<number> {
    const where: Record<string, unknown> = { createdAt: LessThan(date) };
    if (category) where.category = category;
    return this.repo.delete(where).then((r) => r.affected ?? 0);
  }

  private buildSearchQuery(filters: AuditLogSearchFilters): SelectQueryBuilder<AuditLog> {
    const qb = this.repo.createQueryBuilder('log');
    if (filters.userId) qb.andWhere('log.userId = :userId', { userId: filters.userId });
    if (filters.eventType) qb.andWhere('log.eventType = :eventType', { eventType: filters.eventType });
    if (filters.category) qb.andWhere('log.category = :category', { category: filters.category });
    if (filters.action) qb.andWhere('log.action = :action', { action: filters.action });
    if (filters.outcome) qb.andWhere('log.outcome = :outcome', { outcome: filters.outcome });
    if (filters.severity) qb.andWhere('log.severity = :severity', { severity: filters.severity });
    if (filters.resourceType) qb.andWhere('log.resourceType = :resourceType', { resourceType: filters.resourceType });
    if (filters.resourceId) qb.andWhere('log.resourceId = :resourceId', { resourceId: filters.resourceId });
    if (filters.correlationId) qb.andWhere('log.correlationId = :correlationId', { correlationId: filters.correlationId });
    if (filters.fromDate) qb.andWhere('log.createdAt >= :fromDate', { fromDate: filters.fromDate });
    if (filters.toDate) qb.andWhere('log.createdAt <= :toDate', { toDate: filters.toDate });
    if (filters.search) {
      qb.andWhere(
        '(log.description ILIKE :search OR log.eventType ILIKE :search OR log.actorEmail ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    return qb;
  }
}
