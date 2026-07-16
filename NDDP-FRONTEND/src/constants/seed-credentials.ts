/**
 * Seeded demo credentials for local development (mock API).
 * Align with auth-service seeds when backend is connected.
 */
export const SEED_CREDENTIALS = {
  admin: {
    email: import.meta.env.VITE_SEED_ADMIN_EMAIL ?? 'admin@mod.gov.rw',
    password: import.meta.env.VITE_SEED_ADMIN_PASSWORD ?? 'Nddtp@Mod2026!',
    label: 'Super Admin',
  },
  officer: {
    email: import.meta.env.VITE_SEED_OFFICER_EMAIL ?? 'officer@mod.gov.rw',
    password: import.meta.env.VITE_SEED_OFFICER_PASSWORD ?? 'Nddtp@Mod2026!',
    label: 'HR Officer',
  },
  mfa: {
    email: import.meta.env.VITE_SEED_MFA_EMAIL ?? 'mfa@mod.gov.rw',
    password: import.meta.env.VITE_SEED_MFA_PASSWORD ?? 'Nddtp@Mod2026!',
    otp: import.meta.env.VITE_SEED_MFA_OTP ?? '123456',
    label: 'MFA Test Account',
  },
} as const;

export const DEFAULT_LOGIN_EMAIL = SEED_CREDENTIALS.admin.email;
export const DEFAULT_LOGIN_PASSWORD = SEED_CREDENTIALS.admin.password;
