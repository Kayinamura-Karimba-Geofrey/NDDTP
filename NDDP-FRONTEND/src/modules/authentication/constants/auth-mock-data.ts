import type { PaginatedResponse } from '@/types';

export interface AuthSession {
  id: string;
  deviceName: string | null;
  platform: string | null;
  ipAddress: string | null;
  status: string;
  mfaVerified: boolean;
  createdAt: string;
  lastActivityAt: string | null;
  isCurrent: boolean;
}

export interface LoginHistoryEntry {
  id: string;
  email: string;
  result: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface TrustedDevice {
  id: string;
  deviceName: string;
  platform: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastLogin: string;
  status: 'trusted' | 'untrusted' | 'revoked';
}

export const MOCK_SESSIONS: AuthSession[] = [
  {
    id: 'sess-1',
    deviceName: 'Windows Desktop — Chrome',
    platform: 'Windows 11',
    ipAddress: '196.250.12.45',
    status: 'active',
    mfaVerified: true,
    createdAt: '2026-07-07T06:30:00Z',
    lastActivityAt: '2026-07-07T18:45:00Z',
    isCurrent: true,
  },
  {
    id: 'sess-2',
    deviceName: 'iPhone 15 — Safari',
    platform: 'iOS 18',
    ipAddress: '196.250.12.89',
    status: 'active',
    mfaVerified: true,
    createdAt: '2026-07-06T14:20:00Z',
    lastActivityAt: '2026-07-07T08:10:00Z',
    isCurrent: false,
  },
  {
    id: 'sess-3',
    deviceName: 'MacBook Pro — Firefox',
    platform: 'macOS 15',
    ipAddress: '41.242.18.22',
    status: 'revoked',
    mfaVerified: true,
    createdAt: '2026-07-01T09:00:00Z',
    lastActivityAt: '2026-07-05T17:30:00Z',
    isCurrent: false,
  },
];

export const MOCK_LOGIN_HISTORY: LoginHistoryEntry[] = [
  {
    id: 'lh-1',
    email: 'admin@mod.gov.rw',
    result: 'SUCCESS',
    ipAddress: '196.250.12.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124',
    createdAt: '2026-07-07T06:30:00Z',
  },
  {
    id: 'lh-2',
    email: 'admin@mod.gov.rw',
    result: 'FAILED_INVALID_CREDENTIALS',
    ipAddress: '41.242.18.99',
    userAgent: 'Mozilla/5.0 (Linux; Android 14) Chrome/123',
    createdAt: '2026-07-06T22:15:00Z',
  },
  {
    id: 'lh-3',
    email: 'admin@mod.gov.rw',
    result: 'SUCCESS',
    ipAddress: '196.250.12.89',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) Safari/604',
    createdAt: '2026-07-06T14:20:00Z',
  },
  {
    id: 'lh-4',
    email: 'admin@mod.gov.rw',
    result: 'FAILED_ACCOUNT_LOCKED',
    ipAddress: '10.0.0.55',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/124',
    createdAt: '2026-07-05T11:00:00Z',
  },
];

export const MOCK_DEVICES: TrustedDevice[] = [
  {
    id: 'dev-1',
    deviceName: 'Office Workstation',
    platform: 'Desktop',
    browser: 'Chrome 124',
    os: 'Windows 11',
    ipAddress: '196.250.12.45',
    location: 'Kigali, Rwanda',
    lastLogin: '2026-07-07T06:30:00Z',
    status: 'trusted',
  },
  {
    id: 'dev-2',
    deviceName: 'Personal iPhone',
    platform: 'Mobile',
    browser: 'Safari',
    os: 'iOS 18',
    ipAddress: '196.250.12.89',
    location: 'Kigali, Rwanda',
    lastLogin: '2026-07-06T14:20:00Z',
    status: 'trusted',
  },
  {
    id: 'dev-3',
    deviceName: 'Unknown Device',
    platform: 'Desktop',
    browser: 'Firefox 128',
    os: 'macOS 15',
    ipAddress: '41.242.18.22',
    location: 'Unknown',
    lastLogin: '2026-07-01T09:00:00Z',
    status: 'untrusted',
  },
];

export function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

function parseUserAgent(ua: string | null): { browser: string; os: string } {
  if (!ua) return { browser: 'Unknown', os: 'Unknown' };
  const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : 'Browser';
  const os = ua.includes('Windows') ? 'Windows' : ua.includes('Mac') ? 'macOS' : ua.includes('iPhone') ? 'iOS' : ua.includes('Android') ? 'Android' : 'Unknown';
  return { browser, os };
}

export function sessionsToDevices(sessions: AuthSession[]): TrustedDevice[] {
  const map = new Map<string, TrustedDevice>();
  for (const session of sessions) {
    const key = session.deviceName ?? session.id;
    const { browser, os } = parseUserAgent(session.platform);
    const existing = map.get(key);
    if (!existing || new Date(session.createdAt) > new Date(existing.lastLogin)) {
      map.set(key, {
        id: session.id,
        deviceName: session.deviceName ?? 'Unknown Device',
        platform: session.platform?.includes('iOS') || session.platform?.includes('Android') ? 'Mobile' : 'Desktop',
        browser,
        os: session.platform ?? os,
        ipAddress: session.ipAddress ?? '—',
        location: 'Kigali, Rwanda',
        lastLogin: session.lastActivityAt ?? session.createdAt,
        status: session.status === 'active' ? 'trusted' : 'revoked',
      });
    }
  }
  return Array.from(map.values());
}

export function formatLoginResult(result: string): { label: string; success: boolean } {
  if (result === 'SUCCESS') return { label: 'Success', success: true };
  if (result.includes('LOCKED')) return { label: 'Account Locked', success: false };
  if (result.includes('INVALID')) return { label: 'Failed', success: false };
  if (result.includes('MFA')) return { label: 'MFA Required', success: false };
  return { label: result.replace(/_/g, ' '), success: false };
}
