export const CACHE_KEYS = {
  USER_SESSION: (sessionId: string) => `auth:session:${sessionId}`,
  USER_CREDENTIALS: (userId: string) => `auth:credentials:${userId}`,
  REFRESH_TOKEN: (tokenId: string) => `auth:refresh:${tokenId}`,
  LOGIN_ATTEMPTS: (identifier: string) => `auth:login_attempts:${identifier}`,
  MFA_SETUP: (userId: string) => `auth:mfa:setup:${userId}`,
  PASSWORD_RESET: (token: string) => `auth:password_reset:${token}`,
  RATE_LIMIT: (ip: string, endpoint: string) => `auth:rate:${ip}:${endpoint}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  USER_REGISTERED: 'auth.user.registered',
  USER_LOGIN_SUCCESS: 'auth.user.login.success',
  USER_LOGIN_FAILED: 'auth.user.login.failed',
  USER_LOGOUT: 'auth.user.logout',
  USER_PASSWORD_CHANGED: 'auth.user.password.changed',
  USER_PASSWORD_RESET_REQUESTED: 'auth.user.password.reset.requested',
  USER_PASSWORD_RESET_COMPLETED: 'auth.user.password.reset.completed',
  USER_MFA_ENABLED: 'auth.user.mfa.enabled',
  USER_MFA_DISABLED: 'auth.user.mfa.disabled',
  USER_ACCOUNT_LOCKED: 'auth.user.account.locked',
  USER_ACCOUNT_UNLOCKED: 'auth.user.account.unlocked',
  USER_SESSION_REVOKED: 'auth.user.session.revoked',
  USER_TOKEN_REFRESHED: 'auth.user.token.refreshed',
} as const;

export const RABBITMQ_QUEUES = {
  USER_EVENTS: 'auth-service.user.events',
  USER_EVENTS_DLQ: 'auth-service.user.events.dlq',
} as const;
