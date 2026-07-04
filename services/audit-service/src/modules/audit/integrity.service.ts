import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { AuditLog } from '../../database/entities/audit-log.entity';

@Injectable()
export class IntegrityService {
  constructor(private readonly cs: ConfigService) {}

  computeHash(log: Partial<AuditLog>, previousHash: string | null): string {
    const secret = this.cs.get<string>('audit.integritySecret')!;
    const canonical = JSON.stringify({
      eventId: log.eventId,
      eventType: log.eventType,
      source: log.source,
      category: log.category,
      action: log.action,
      outcome: log.outcome,
      severity: log.severity,
      userId: log.userId,
      actorEmail: log.actorEmail,
      resourceType: log.resourceType,
      resourceId: log.resourceId,
      correlationId: log.correlationId,
      payload: log.payload,
      previousHash: previousHash || 'GENESIS',
    });
    return createHmac('sha256', secret).update(canonical).digest('hex');
  }

  verify(log: AuditLog): boolean {
    const expected = this.computeHash(log, log.previousHash);
    return expected === log.integrityHash;
  }
}
