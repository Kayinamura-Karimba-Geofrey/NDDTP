export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  BOUNCED = 'BOUNCED',
}

export enum TemplateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum NotificationEventType {
  SENT = 'notification.sent',
  DELIVERED = 'notification.delivered',
  FAILED = 'notification.failed',
  READ = 'notification.read',
}

export enum ConsumedEventType {
  PASSWORD_RESET = 'auth.user.password.reset.requested',
  ACCOUNT_LOCKED = 'auth.user.account.locked',
  USER_CREATED = 'user.user.created',
  ROLE_ASSIGNED = 'authorization.role.assigned',
  MFA_ENABLED = 'auth.user.mfa.enabled',
}
