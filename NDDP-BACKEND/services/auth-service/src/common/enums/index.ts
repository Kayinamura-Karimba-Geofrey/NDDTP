export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export enum MfaMethod {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

export enum MfaStatus {
  DISABLED = 'DISABLED',
  PENDING_SETUP = 'PENDING_SETUP',
  ENABLED = 'ENABLED',
}

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export enum LoginAttemptResult {
  SUCCESS = 'SUCCESS',
  FAILED_INVALID_CREDENTIALS = 'FAILED_INVALID_CREDENTIALS',
  FAILED_ACCOUNT_LOCKED = 'FAILED_ACCOUNT_LOCKED',
  FAILED_ACCOUNT_INACTIVE = 'FAILED_ACCOUNT_INACTIVE',
  FAILED_MFA_REQUIRED = 'FAILED_MFA_REQUIRED',
  FAILED_MFA_INVALID = 'FAILED_MFA_INVALID',
}

export enum AuthEventType {
  USER_REGISTERED = 'auth.user.registered',
  USER_LOGIN_SUCCESS = 'auth.user.login.success',
  USER_LOGIN_FAILED = 'auth.user.login.failed',
  USER_LOGOUT = 'auth.user.logout',
  USER_PASSWORD_CHANGED = 'auth.user.password.changed',
  USER_PASSWORD_RESET_REQUESTED = 'auth.user.password.reset.requested',
  USER_PASSWORD_RESET_COMPLETED = 'auth.user.password.reset.completed',
  USER_MFA_ENABLED = 'auth.user.mfa.enabled',
  USER_MFA_DISABLED = 'auth.user.mfa.disabled',
  USER_ACCOUNT_LOCKED = 'auth.user.account.locked',
  USER_ACCOUNT_UNLOCKED = 'auth.user.account.unlocked',
  USER_SESSION_REVOKED = 'auth.user.session.revoked',
  USER_TOKEN_REFRESHED = 'auth.user.token.refreshed',
}

export enum ConsumedEventType {
  USER_CREATED = 'user.user.created',
  USER_UPDATED = 'user.user.updated',
  USER_DEACTIVATED = 'user.user.deactivated',
  USER_DELETED = 'user.user.deleted',
}
