import type { AuthTokens, AuthUser, UserRole } from '@/types';
import { API_SERVICE_BASE } from '@/constants/services';
import { unwrapApiResponse } from '@/utils/api-response';

const DEVICE_ID_KEY = 'nddtp_device_id';

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

function authRequestBody(email: string, password: string) {
  return JSON.stringify({
    email,
    password,
    deviceId: getDeviceId(),
    deviceName: navigator.userAgent.slice(0, 120),
  });
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  sessionId: string;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeNumber?: string | null;
  rank?: string | null;
  jobTitle?: string | null;
  department?: { id: string; code: string; name: string } | null;
  profilePhotoUrl?: string | null;
}

interface EffectivePermissions {
  userId: string;
  roles: string[];
  permissions: string[];
  computedAt: string;
}

export function mapTokenResponse(tokens: TokenResponse): AuthTokens {
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
  };
}

async function serviceFetch<T>(
  service: string,
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_SERVICE_BASE}/${service}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Correlation-Id': crypto.randomUUID(),
      ...init?.headers,
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof body?.message === 'string' ? body.message : `Request failed (${response.status})`,
    );
  }

  return unwrapApiResponse<T>(body);
}

export async function buildAuthUser(accessToken: string): Promise<AuthUser> {
  const [profile, authz] = await Promise.all([
    serviceFetch<UserProfile>('user', '/users/me', accessToken),
    serviceFetch<EffectivePermissions>('authorization', '/authorization/me/permissions', accessToken),
  ]);

  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    employeeNumber: profile.employeeNumber ?? undefined,
    jobTitle: profile.jobTitle ?? undefined,
    roles: authz.roles as UserRole[],
    permissions: authz.permissions,
    department: profile.department?.name,
    rank: profile.rank ?? undefined,
    avatarUrl: profile.profilePhotoUrl ?? undefined,
  };
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<{ tokens: AuthTokens; user: AuthUser } | { mfaRequired: true; mfaToken: string }> {
  const response = await fetch(`${API_SERVICE_BASE}/auth/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Correlation-Id': crypto.randomUUID(),
    },
    body: authRequestBody(email, password),
  });

  const body = await response.json().catch(() => ({}));

  if (response.status === 401 && body?.error === 'MfaRequired' && body?.mfaToken) {
    return { mfaRequired: true, mfaToken: body.mfaToken as string };
  }

  if (!response.ok) {
    throw new Error(typeof body?.message === 'string' ? body.message : 'Invalid email or password');
  }

  const tokens = mapTokenResponse(unwrapApiResponse<TokenResponse>(body));
  const user = await buildAuthUser(tokens.accessToken);
  return { tokens, user };
}

export async function verifyMfaRequest(
  mfaToken: string,
  code: string,
): Promise<{ tokens: AuthTokens; user: AuthUser }> {
  const response = await fetch(`${API_SERVICE_BASE}/auth/auth/mfa/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Correlation-Id': crypto.randomUUID(),
    },
    body: JSON.stringify({ mfaToken, code }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof body?.message === 'string' ? body.message : 'Invalid verification code');
  }

  const tokens = mapTokenResponse(unwrapApiResponse<TokenResponse>(body));
  const user = await buildAuthUser(tokens.accessToken);
  return { tokens, user };
}
