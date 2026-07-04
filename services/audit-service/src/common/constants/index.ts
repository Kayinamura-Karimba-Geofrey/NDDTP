export const CACHE_KEYS = {
  RECENT_USER_ACTIVITY: (userId: string) => `audit:recent:${userId}`,
  DAILY_STATS: (date: string) => `audit:stats:${date}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  LOG_CREATED: 'audit.log.created',
  SECURITY_RECORDED: 'audit.security.recorded',
  RETENTION_APPLIED: 'audit.retention.applied',
} as const;

export const RABBITMQ_QUEUES = {
  PLATFORM_EVENTS: 'audit-service.platform.events',
  PLATFORM_EVENTS_DLQ: 'audit-service.platform.events.dlq',
} as const;

export const SECURITY_EVENT_TYPES = new Set([
  'auth.user.login.failed',
  'auth.user.account.locked',
  'authorization.access.denied',
  'auth.user.password.reset.requested',
]);

export const EVENT_CATEGORY_MAP: Record<string, string> = {
  'auth.': 'AUTHENTICATION',
  'authorization.': 'AUTHORIZATION',
  'user.': 'USER_MANAGEMENT',
  'notification.': 'NOTIFICATION',
  'audit.': 'SYSTEM',
};

export const EVENT_ACTION_MAP: Record<string, string> = {
  '.created': 'CREATE',
  '.updated': 'UPDATE',
  '.deleted': 'DELETE',
  '.login.success': 'LOGIN',
  '.login.failed': 'LOGIN',
  '.logout': 'LOGOUT',
  '.assigned': 'UPDATE',
  '.revoked': 'DELETE',
  '.granted': 'UPDATE',
  '.denied': 'ACCESS',
  '.sent': 'EXECUTE',
  '.failed': 'EXECUTE',
};
