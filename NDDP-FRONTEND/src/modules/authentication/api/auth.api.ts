import { baseApi } from '@/services/api/base-api';
import type { AuthTokens, AuthUser, LoginCredentials, UserRole } from '@/types';
import { ENABLE_MOCK_API } from '@/constants/app';
import { SEED_CREDENTIALS } from '@/constants/seed-credentials';

const seedUsers: Record<string, AuthUser> = {
  [SEED_CREDENTIALS.admin.email]: {
    id: '1',
    email: SEED_CREDENTIALS.admin.email,
    firstName: 'Jean',
    lastName: 'Mukamana',
    roles: ['SUPER_ADMIN'],
    permissions: ['*'],
    department: 'Ministry of Defence',
    rank: 'Colonel',
  },
  [SEED_CREDENTIALS.officer.email]: {
    id: '2',
    email: SEED_CREDENTIALS.officer.email,
    firstName: 'Patrick',
    lastName: 'Habimana',
    roles: ['HR_MANAGER' as UserRole],
    permissions: ['personnel.read', 'personnel.write', 'leave.read', 'leave.approve', 'users.read'],
    department: 'Directorate of Corporate Services',
    rank: 'Major',
  },
  [SEED_CREDENTIALS.mfa.email]: {
    id: '3',
    email: SEED_CREDENTIALS.mfa.email,
    firstName: 'Alice',
    lastName: 'Uwase',
    roles: ['ADMIN'],
    permissions: ['*'],
    department: 'Directorate General of Digitalization',
    rank: 'Captain',
  },
};

const validLogins = new Set([
  `${SEED_CREDENTIALS.admin.email}:${SEED_CREDENTIALS.admin.password}`,
  `${SEED_CREDENTIALS.officer.email}:${SEED_CREDENTIALS.officer.password}`,
  `${SEED_CREDENTIALS.mfa.email}:${SEED_CREDENTIALS.mfa.password}`,
]);

const mockTokens: AuthTokens = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: 3600,
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: AuthUser; tokens: AuthTokens; mfaRequired?: boolean },
      LoginCredentials
    >({
      queryFn: async (credentials) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 800));

          const key = `${credentials.email.toLowerCase()}:${credentials.password}`;
          if (!validLogins.has(key)) {
            return { error: { status: 401, data: { message: 'Invalid email or password' } } };
          }

          const user = seedUsers[credentials.email.toLowerCase()];
          if (!user) {
            return { error: { status: 401, data: { message: 'Invalid email or password' } } };
          }

          if (credentials.email.toLowerCase() === SEED_CREDENTIALS.mfa.email) {
            return { data: { user, tokens: mockTokens, mfaRequired: true } };
          }

          return { data: { user, tokens: mockTokens } };
        }
        return { error: { status: 501, data: { message: 'Connect API gateway' } } };
      },
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 600));
        return { data: { message: 'If the email exists, a reset link has been sent.' } };
      },
    }),
    verifyOtp: builder.mutation<{ user: AuthUser; tokens: AuthTokens }, { code: string }>({
      queryFn: async ({ code }) => {
        await new Promise((r) => setTimeout(r, 600));
        if (code !== SEED_CREDENTIALS.mfa.otp) {
          return { error: { status: 400, data: { message: 'Invalid verification code' } } };
        }
        const user = seedUsers[SEED_CREDENTIALS.mfa.email];
        return { data: { user, tokens: mockTokens } };
      },
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation, useVerifyOtpMutation } = authApi;
