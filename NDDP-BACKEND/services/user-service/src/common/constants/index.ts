export const CACHE_KEYS = {
  USER: (id: string) => `user:profile:${id}`,
  USER_BY_EMAIL: (email: string) => `user:email:${email.toLowerCase()}`,
  USER_BY_EMPLOYEE_NUMBER: (num: string) => `user:employee:${num}`,
  DEPARTMENT: (id: string) => `user:department:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  USER_CREATED: 'user.user.created',
  USER_UPDATED: 'user.user.updated',
  USER_DEACTIVATED: 'user.user.deactivated',
  USER_REACTIVATED: 'user.user.reactivated',
  USER_DELETED: 'user.user.deleted',
} as const;

export const RABBITMQ_QUEUES = {
  AUTH_EVENTS: 'user-service.auth.events',
  AUTH_EVENTS_DLQ: 'user-service.auth.events.dlq',
} as const;
