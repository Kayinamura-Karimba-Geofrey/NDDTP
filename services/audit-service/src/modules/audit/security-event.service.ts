import { Injectable } from '@nestjs/common';
import { SecurityEventRepository } from './repositories/security-event.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { PaginatedResult } from '@nddtp/platform-core';
import { ResourceNotFoundException } from '../../common/exceptions/audit.exceptions';
import { SecurityEvent } from '../../database/entities/security-event.entity';
import { SecurityEventType, AuditSeverity } from '../../common/enums';
import { SecurityEventSearchFilters } from './repositories/security-event.repository';

export interface CreateSecurityEventInput {
  eventId?: string;
  eventType: SecurityEventType;
  severity: AuditSeverity;
  userId?: string;
  actorEmail?: string;
  sourceEvent?: string;
  ipAddress?: string;
  userAgent?: string;
  correlationId?: string;
  description: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class SecurityEventService {
  constructor(
    private readonly repo: SecurityEventRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(input: CreateSecurityEventInput): Promise<SecurityEvent> {
    const entity = this.repo.create({
      eventId: input.eventId ?? null,
      eventType: input.eventType,
      severity: input.severity,
      userId: input.userId ?? null,
      actorEmail: input.actorEmail ?? null,
      sourceEvent: input.sourceEvent ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      correlationId: input.correlationId ?? null,
      description: input.description,
      metadata: input.metadata ?? null,
    });

    const saved = await this.repo.save(entity);
    await this.publisher.publishSecurityRecorded({
      securityEventId: saved.id,
      eventType: saved.eventType,
      severity: saved.severity,
      userId: saved.userId,
    }, saved.correlationId ?? undefined);

    return saved;
  }

  async findById(id: string): Promise<SecurityEvent> {
    const event = await this.repo.findById(id);
    if (!event) throw new ResourceNotFoundException('SecurityEvent', id);
    return event;
  }

  async search(filters: SecurityEventSearchFilters, page = 1, limit = 50): Promise<PaginatedResult<SecurityEvent>> {
    const { data, total } = await this.repo.search(filters, page, limit);
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

  async resolve(id: string, resolvedBy: string): Promise<SecurityEvent> {
    const event = await this.findById(id);
    event.isResolved = true;
    event.resolvedAt = new Date();
    event.resolvedBy = resolvedBy;
    return this.repo.save(event);
  }
}
