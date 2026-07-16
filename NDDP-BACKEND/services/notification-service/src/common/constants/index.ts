export const CACHE_KEYS = {
  TEMPLATE: (code: string) => `notification:template:${code}`,
  USER_PREFS: (userId: string) => `notification:prefs:${userId}`,
  UNREAD_COUNT: (userId: string) => `notification:unread:${userId}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  SENT: 'notification.sent',
  DELIVERED: 'notification.delivered',
  FAILED: 'notification.failed',
  READ: 'notification.read',
} as const;

export const RABBITMQ_QUEUES = {
  PLATFORM_EVENTS: 'notification-service.platform.events',
  PLATFORM_EVENTS_DLQ: 'notification-service.platform.events.dlq',
  DELIVERY_RETRY: 'notification-service.delivery.retry',
} as const;

export const EVENT_TEMPLATE_MAP: Record<string, { templateCode: string; channel: string }> = {
  'auth.user.password.reset.requested': { templateCode: 'PASSWORD_RESET', channel: 'EMAIL' },
  'auth.user.account.locked': { templateCode: 'ACCOUNT_LOCKED', channel: 'EMAIL' },
  'user.user.created': { templateCode: 'WELCOME', channel: 'EMAIL' },
  'authorization.role.assigned': { templateCode: 'ROLE_ASSIGNED', channel: 'IN_APP' },
  'auth.user.mfa.enabled': { templateCode: 'MFA_ENABLED', channel: 'EMAIL' },
};
