import { Injectable } from '@nestjs/common';
import {
  AuditAction, AuditOutcome, AuditSeverity, SecurityEventType, AuditEventCategory,
} from '../../common/enums';
import { EVENT_CATEGORY_MAP, EVENT_ACTION_MAP, SECURITY_EVENT_TYPES } from '../../common/constants';
import { PlatformEventPayload, CreateAuditLogInput } from '../../common/interfaces';

@Injectable()
export class EventMapperService {
  mapPlatformEvent(event: PlatformEventPayload): CreateAuditLogInput {
    const { eventType, source, data, correlationId, eventId } = event;
    const category = this.resolveCategory(eventType);
    const action = this.resolveAction(eventType);
    const outcome = this.resolveOutcome(eventType);
    const severity = this.resolveSeverity(eventType, outcome);

    return {
      eventId,
      eventType,
      source,
      category,
      action,
      outcome,
      severity,
      userId: this.extractUserId(data),
      actorEmail: data.email as string | undefined,
      resourceType: data.resourceType as string | undefined,
      resourceId: (data.resourceId || data.userId || data.roleId) as string | undefined,
      ipAddress: data.ipAddress as string | undefined,
      userAgent: data.userAgent as string | undefined,
      correlationId,
      payload: data,
      description: this.buildDescription(eventType, data),
    };
  }

  isSecurityEvent(eventType: string): boolean {
    return SECURITY_EVENT_TYPES.has(eventType) || eventType.includes('.failed') || eventType.includes('.denied') || eventType.includes('.locked');
  }

  mapSecurityEventType(eventType: string): SecurityEventType {
    if (eventType.includes('login.failed')) return SecurityEventType.LOGIN_FAILED;
    if (eventType.includes('account.locked')) return SecurityEventType.ACCOUNT_LOCKED;
    if (eventType.includes('access.denied')) return SecurityEventType.ACCESS_DENIED;
    if (eventType.includes('role.assigned') && eventType.includes('SUPER_ADMIN')) return SecurityEventType.PRIVILEGE_ESCALATION;
    if (eventType.includes('export')) return SecurityEventType.DATA_EXPORT;
    if (eventType.includes('config')) return SecurityEventType.CONFIG_CHANGE;
    return SecurityEventType.SUSPICIOUS_ACTIVITY;
  }

  private resolveCategory(eventType: string): string {
    for (const [prefix, category] of Object.entries(EVENT_CATEGORY_MAP)) {
      if (eventType.startsWith(prefix)) return category;
    }
    return AuditEventCategory.SYSTEM;
  }

  private resolveAction(eventType: string): string {
    for (const [suffix, action] of Object.entries(EVENT_ACTION_MAP)) {
      if (eventType.includes(suffix)) return action;
    }
    return AuditAction.EXECUTE;
  }

  private resolveOutcome(eventType: string): string {
    if (eventType.includes('.failed') || eventType.includes('.denied') || eventType.includes('.locked')) {
      return AuditOutcome.FAILURE;
    }
    if (eventType.includes('.denied')) return AuditOutcome.DENIED;
    return AuditOutcome.SUCCESS;
  }

  private resolveSeverity(eventType: string, outcome: string): string {
    if (eventType.includes('.locked') || eventType.includes('privilege')) return AuditSeverity.CRITICAL;
    if (eventType.includes('.failed') || eventType.includes('.denied')) return AuditSeverity.WARNING;
    if (outcome === AuditOutcome.FAILURE) return AuditSeverity.ERROR;
    return AuditSeverity.INFO;
  }

  private extractUserId(data: Record<string, unknown>): string | undefined {
    return (data.userId || data.actorId || data.sub) as string | undefined;
  }

  private buildDescription(eventType: string, data: Record<string, unknown>): string {
    const user = data.email || data.userId || 'unknown';
    return `Platform event ${eventType} for ${user}`;
  }
}
