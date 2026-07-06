import { TOKEN_KEYS } from '@/constants/app';
import type { AuthTokens } from '@/types';

const MOCK_ACCESS_TOKEN = 'mock-access-token';

export function clearAuthStorage(): void {
  sessionStorage.clear();
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
  localStorage.removeItem(TOKEN_KEYS.USER);
  localStorage.removeItem(TOKEN_KEYS.MFA);
}

export function getStoredTokens(): AuthTokens | null {
  const access =
    sessionStorage.getItem(TOKEN_KEYS.ACCESS) ?? localStorage.getItem(TOKEN_KEYS.ACCESS);
  const refresh =
    sessionStorage.getItem(TOKEN_KEYS.REFRESH) ?? localStorage.getItem(TOKEN_KEYS.REFRESH);
  if (!access || !refresh) return null;
  return { accessToken: access, refreshToken: refresh, expiresIn: 3600 };
}

export function isMockAccessToken(token: string): boolean {
  return token === MOCK_ACCESS_TOKEN || token.startsWith('mock-');
}

export function isJwtExpired(token: string, skewMs = 30_000): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as {
      exp?: number;
    };
    if (!payload.exp) return false;
    return payload.exp * 1000 <= Date.now() + skewMs;
  } catch {
    return true;
  }
}

/** Drop mock/invalid tokens left from an earlier mock-API session. */
export function sanitizeStoredAuth(): void {
  const tokens = getStoredTokens();
  if (!tokens) return;
  if (isMockAccessToken(tokens.accessToken) || isMockAccessToken(tokens.refreshToken)) {
    clearAuthStorage();
  }
}

export function redirectToSessionExpired(): void {
  clearAuthStorage();
  if (!window.location.pathname.startsWith('/auth/')) {
    window.location.href = '/auth/session-expired';
  }
}
