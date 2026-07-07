import { baseApi } from '@/services/api/base-api';
import type { AuthTokens, AuthUser, LoginCredentials } from '@/types';
import { ENABLE_MOCK_API } from '@/constants/app';
import { SEED_CREDENTIALS } from '@/constants/seed-credentials';
import { TOKEN_KEYS } from '@/constants/app';
import {
  loginRequest,
  verifyMfaRequest,
  mapTokenResponse,
  buildAuthUser,
} from '@/services/api/auth-profile';
import { getErrorMessage } from '@/utils/api-response';
import { serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';

const seedUsers: Record<string, AuthUser> = {
  [SEED_CREDENTIALS.admin.email]: {
    id: '1',
    email: SEED_CREDENTIALS.admin.email,
    firstName: 'Jean',
    lastName: 'Mukamana',
    employeeNumber: 'MOD-00001',
    jobTitle: 'System Administrator',
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
      query: (body) => serviceQuery('auth', '/auth/forgot-password', { method: 'POST', body, skipAuthRedirect: true }),
      transformResponse: unwrapApiResponse<{ message: string }>,
    }),
    verifyOtp: builder.mutation<{ user: AuthUser; tokens: AuthTokens }, { code: string }>({
      queryFn: async ({ code }) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 600));
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
    refreshToken: builder.mutation<AuthTokens, { refreshToken: string }>({
      query: (body) =>
        serviceQuery('auth', '/auth/refresh', { method: 'POST', body, skipAuthRedirect: true }),
      transformResponse: (response) => mapTokenResponse(unwrapApiResponse(response)),
    }),
    logout: builder.mutation<{ message: string }, { refreshToken?: string }>({
      query: (body) => serviceQuery('auth', '/auth/logout', { method: 'POST', body }),
      transformResponse: unwrapApiResponse<{ message: string }>,
    }),
    getProfile: builder.query<AuthUser, void>({
      queryFn: async () => {
        const token =
          sessionStorage.getItem(TOKEN_KEYS.ACCESS) ?? localStorage.getItem(TOKEN_KEYS.ACCESS);
        if (!token) {
          return { error: { status: 401, data: { message: 'Not authenticated' } } };
        }
        try {
          const user = await buildAuthUser(token);
          return { data: user };
        } catch (err) {
          return {
            error: {
              status: 500,
              data: { message: getErrorMessage(err, 'Failed to load profile') },
            },
          };
        }
      },
      providesTags: ['Auth', 'Profile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
