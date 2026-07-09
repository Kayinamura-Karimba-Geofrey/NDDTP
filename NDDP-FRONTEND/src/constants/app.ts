export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'NDDTP';
export const APP_TITLE =
  import.meta.env.VITE_APP_TITLE ?? 'National Defence Digital Transformation Platform';
export const ENABLE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

export const TOKEN_KEYS = {
  ACCESS: 'nddtp_access_token',
  REFRESH: 'nddtp_refresh_token',
  USER: 'nddtp_user',
  MFA: 'nddtp_mfa_token',
} as const;

export const ROUTES = {
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  OTP: '/auth/otp',
  CHANGE_PASSWORD: '/auth/change-password',
  SESSION_EXPIRED: '/auth/session-expired',
  ACCOUNT_LOCKED: '/auth/account-locked',
  SESSIONS: '/auth/sessions',
  LOGIN_HISTORY: '/auth/login-history',
  SECURITY_SETTINGS: '/auth/security',
  DEVICES: '/auth/devices',
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;
