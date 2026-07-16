import { baseApi } from '@/services/api/base-api';
import type { AuthTokens, AuthUser, LoginCredentials } from '@/types';
import { ENABLE_MOCK_API } from '@/constants/app';
import { SEED_CREDENTIALS } from '@/constants/seed-credentials';
import { TOKEN_KEYS } from '@/constants/app';
import {
  loginRequest,
  verifyMfaRequest,
} from '@/services/api/auth-profile';
import { serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import { mockDelay } from '@/utils/api-mock';

const seedUsers: Record<string, AuthUser> = {
  [SEED_CREDENTIALS.admin.email]: {
    id: 'USR-ME',
    email: SEED_CREDENTIALS.admin.email,
    firstName: 'Demo',
    lastName: 'Administrator',
    employeeNumber: 'EMP-0001',
    jobTitle: 'System Administrator',
    roles: ['SUPER_ADMIN'],
    permissions: ['*'],
    department: 'Directorate of Digital Transformation',
    rank: '—',
  },
  [SEED_CREDENTIALS.officer.email]: {
    id: '2',
    email: SEED_CREDENTIALS.officer.email,
    firstName: 'Patrick',
    lastName: 'Habimana',
    employeeNumber: 'MOD-00452',
    jobTitle: 'Personnel Officer',
    roles: ['HR_MANAGER'],
    permissions: ['personnel:read:profile', 'leave:read:requests', 'leave:approve:requests'],
    department: 'Directorate of Corporate Services',
    rank: 'Major',
  },
  [SEED_CREDENTIALS.mfa.email]: {
    id: '3',
    email: SEED_CREDENTIALS.mfa.email,
    firstName: 'Alice',
    lastName: 'Uwase',
    employeeNumber: 'MOD-00218',
    jobTitle: 'Digital Transformation Officer',
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
      { user: AuthUser | null; tokens: AuthTokens | null; mfaRequired?: boolean; mfaToken?: string },
      LoginCredentials
    >({
      queryFn: async (credentials) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(800);
          const key = `${credentials.email.toLowerCase()}:${credentials.password}`;
          if (!validLogins.has(key)) {
            return { error: { status: 401, data: { message: 'Invalid email or password' } } };
          }
          const user = seedUsers[credentials.email.toLowerCase()];
          if (!user) {
            return { error: { status: 401, data: { message: 'Invalid email or password' } } };
          }
          if (credentials.email.toLowerCase() === SEED_CREDENTIALS.mfa.email) {
            sessionStorage.setItem(TOKEN_KEYS.MFA, 'mock-mfa-token');
            return { data: { user: null, tokens: null, mfaRequired: true, mfaToken: 'mock-mfa-token' } };
          }
          return { data: { user, tokens: mockTokens } };
        }

        try {
          const result = await loginRequest(credentials.email, credentials.password);
          if ('mfaRequired' in result) {
            sessionStorage.setItem(TOKEN_KEYS.MFA, result.mfaToken);
            return {
              data: {
                user: null,
                tokens: null,
                mfaRequired: true,
                mfaToken: result.mfaToken,
              },
            };
          }
          return { data: { user: result.user, tokens: result.tokens } };
        } catch (err) {
          return {
            error: {
              status: 401,
              data: { message: err instanceof Error ? err.message : 'Login failed' },
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      queryFn: async (body, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(600);
          return { data: { message: 'If the email exists, a password reset link has been sent' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', '/auth/forgot-password', { method: 'POST', body, skipAuthRedirect: true }),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
    }),
    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      queryFn: async (body, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(600);
          if (!body.token) {
            return { error: { status: 400, data: { message: 'Invalid or expired reset token' } } };
          }
          return { data: { message: 'Password reset successfully' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', '/auth/reset-password', {
            method: 'POST',
            body: { token: body.token, newPassword: body.password },
            skipAuthRedirect: true,
          }),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
    }),
    changePassword: builder.mutation<{ message: string }, { currentPassword: string; newPassword: string }>({
      queryFn: async (body, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(600);
          return { data: { message: 'Password changed successfully. Please login again.' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', '/auth/change-password', { method: 'POST', body }),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
      invalidatesTags: ['Auth', 'Sessions'],
    }),
    verifyOtp: builder.mutation<{ user: AuthUser; tokens: AuthTokens }, { code: string }>({
      queryFn: async ({ code }) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(600);
          if (code !== SEED_CREDENTIALS.mfa.otp) {
            return { error: { status: 400, data: { message: 'Invalid verification code' } } };
          }
          const user = seedUsers[SEED_CREDENTIALS.mfa.email];
          sessionStorage.removeItem(TOKEN_KEYS.MFA);
          return { data: { user, tokens: mockTokens } };
        }

        const mfaToken = sessionStorage.getItem(TOKEN_KEYS.MFA);
        if (!mfaToken) {
          return { error: { status: 400, data: { message: 'MFA session expired. Please sign in again.' } } };
        }

        try {
          const result = await verifyMfaRequest(mfaToken, code);
          sessionStorage.removeItem(TOKEN_KEYS.MFA);
          return { data: result };
        } catch (err) {
          return {
            error: {
              status: 400,
              data: { message: err instanceof Error ? err.message : 'Invalid verification code' },
            },
          };
        }
      },
    }),
    logout: builder.mutation<{ message: string }, { refreshToken?: string } | void>({
      queryFn: async (body, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: { message: 'Logged out' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', '/auth/logout', {
            method: 'POST',
            body: body ?? {},
            skipAuthRedirect: true,
          }),
        );
        if (result.error) {
          return { data: { message: 'Logged out locally' } };
        }
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = authApi;
