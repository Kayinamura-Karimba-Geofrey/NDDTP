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

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface PlatformEventPayload {
  eventId: string;
  eventType: string;
  timestamp: string;
  correlationId: string;
  source: string;
  version: string;
  data: Record<string, unknown>;
}
