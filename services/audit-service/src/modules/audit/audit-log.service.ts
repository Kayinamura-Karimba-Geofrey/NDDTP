import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { IntegrityService } from './integrity.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CreateAuditLogInput, PaginatedResult } from '../../common/interfaces';
import { ResourceNotFoundException, IntegrityViolationException } from '../../common/exceptions/audit.exceptions';
import { AuditLog } from '../../database/entities/audit-log.entity';
import { AuditAction, AuditOutcome, AuditSeverity } from '../../common/enums';
import { CACHE_KEYS } from '../../common/constants';
import { AuditLogSearchFilters } from './repositories/audit-log.repository';

@Injectable()
export class AuditLogService {
  constructor(
    private readonly repo: AuditLogRepository,
    private readonly integrity: IntegrityService,
    private readonly publisher: EventPublisherService,
    private readonly redis: RedisService,
  ) {}

  async create(input: CreateAuditLogInput): Promise<AuditLog> {
    const previousHash = await this.repo.findLatestHash();
    const entity = this.repo.create({
      eventId: input.eventId ?? null,
      eventType: input.eventType,
      source: input.source,
      category: input.category,
      action: input.action as AuditAction,
      outcome: input.outcome as AuditOutcome,
      severity: input.severity as AuditSeverity,
      userId: input.userId ?? null,
      actorEmail: input.actorEmail ?? null,
      resourceType: input.resourceType ?? null,
      resourceId: input.resourceId ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      correlationId: input.correlationId ?? null,
      payload: input.payload ?? null,
      description: input.description ?? null,
      previousHash,
      integrityHash: '',
    });

    entity.integrityHash = this.integrity.computeHash(entity, previousHash);
    const saved = await this.repo.save(entity);

    if (saved.userId) {
      await this.redis.del(CACHE_KEYS.RECENT_USER_ACTIVITY(saved.userId));
    }

    await this.publisher.publishLogCreated({
      logId: saved.id,
      eventType: saved.eventType,
      category: saved.category,
      userId: saved.userId,
    }, saved.correlationId ?? undefined);

    return saved;
  }

  async findById(id: string, verify = false): Promise<AuditLog> {
    const log = await this.repo.findById(id);
    if (!log) throw new ResourceNotFoundException('AuditLog', id);
    if (verify && !this.integrity.verify(log)) throw new IntegrityViolationException(id);
    return log;
  }

  async search(filters: AuditLogSearchFilters, page = 1, limit = 50): Promise<PaginatedResult<AuditLog>> {
    const { data, total } = await this.repo.search(filters, page, limit);
    return this.paginate(data, total, page, limit);
  }

  async getUserActivity(userId: string, page = 1, limit = 50): Promise<PaginatedResult<AuditLog>> {
    const { data, total } = await this.repo.findByUserId(userId, page, limit);
    return this.paginate(data, total, page, limit);
  }

  async getResourceHistory(resourceType: string, resourceId: string, page = 1, limit = 50): Promise<PaginatedResult<AuditLog>> {
    const { data, total } = await this.repo.findByResource(resourceType, resourceId, page, limit);
    return this.paginate(data, total, page, limit);
  }

  async verifyIntegrity(id: string): Promise<{ valid: boolean; logId: string }> {
    const log = await this.findById(id);
    return { valid: this.integrity.verify(log), logId: id };
  }

  private paginate<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        page, limit, total, totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
