/**
 * Seeded demo credentials for local development (mock API).
 * Align with auth-service seeds when backend is connected.
 *
 * Each value is guarded inline by DEMO so the bundler can drop the literals
 * from production builds (unless VITE_ENABLE_DEMO_LOGIN=true is set).
 */
const DEMO = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'true';

export const SEED_CREDENTIALS = {
  admin: {
    email: DEMO ? (import.meta.env.VITE_SEED_ADMIN_EMAIL ?? 'admin@mod.gov.rw') : '',
    password: DEMO ? (import.meta.env.VITE_SEED_ADMIN_PASSWORD ?? 'Nddtp@Mod2026!') : '',
    label: 'Super Admin',
  },
  officer: {
    email: DEMO ? (import.meta.env.VITE_SEED_OFFICER_EMAIL ?? 'officer@mod.gov.rw') : '',
    password: DEMO ? (import.meta.env.VITE_SEED_OFFICER_PASSWORD ?? 'Nddtp@Mod2026!') : '',
    label: 'HR Officer',
  },
  mfa: {
    email: DEMO ? (import.meta.env.VITE_SEED_MFA_EMAIL ?? 'mfa@mod.gov.rw') : '',
    password: DEMO ? (import.meta.env.VITE_SEED_MFA_PASSWORD ?? 'Nddtp@Mod2026!') : '',
    otp: DEMO ? (import.meta.env.VITE_SEED_MFA_OTP ?? '123456') : '',
    label: 'MFA Test Account',
  },
} as const;

export const SHOW_DEMO_CREDENTIALS = DEMO && SEED_CREDENTIALS.admin.email !== '';

export const DEFAULT_LOGIN_EMAIL = SEED_CREDENTIALS.admin.email;
export const DEFAULT_LOGIN_PASSWORD = SEED_CREDENTIALS.admin.password;
