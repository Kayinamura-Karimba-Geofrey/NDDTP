export interface CreateAuditLogInput {
  eventId?: string;
  eventType: string;
  source: string;
  category: string;
  action: string;
  outcome: string;
  severity: string;
  userId?: string;
  actorEmail?: string;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  correlationId?: string;
  payload?: Record<string, unknown>;
  description?: string;
}
