import { Request } from 'express';

export interface AuthenticatedUser {
  sub: string;
  email: string;
  sessionId: string;
  roles: string[];
  permissions: string[];
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
  correlationId?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface AuthzEventPayload {
  eventId: string;
  eventType: string;
  timestamp: string;
  correlationId: string;
  source: string;
  version: string;
  data: Record<string, unknown>;
}

export interface AuthorizationCheckResult {
  allowed: boolean;
  userId: string;
  permission: string;
  matchedRoles: string[];
  scope?: string;
  reason?: string;
}

export interface EffectivePermissions {
  userId: string;
  roles: string[];
  permissions: string[];
  computedAt: string;
}
