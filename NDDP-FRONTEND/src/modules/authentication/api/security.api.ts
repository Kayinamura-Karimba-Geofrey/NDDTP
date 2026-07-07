import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_SESSIONS,
  MOCK_LOGIN_HISTORY,
  MOCK_DEVICES,
  paginate,
  sessionsToDevices,
  type AuthSession,
  type LoginHistoryEntry,
  type TrustedDevice,
} from '../constants/auth-mock-data';

export const securityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<PaginatedResponse<AuthSession>, { page?: number; limit?: number; status?: string }>({
      queryFn: async ({ page = 1, limit = 20, status }, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 400));
          const filtered = status ? MOCK_SESSIONS.filter((s) => s.status === status) : MOCK_SESSIONS;
          return { data: paginate(filtered, page, limit) };
        }
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (status) params.set('status', status);
        const result = await baseQuery(
          serviceQuery('auth', `/sessions?${params}`),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<PaginatedResponse<AuthSession>>(result.data) };
      },
      providesTags: ['Sessions'],
    }),

    revokeSession: builder.mutation<{ message: string }, string>({
      queryFn: async (sessionId, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          return { data: { message: 'Session revoked successfully' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', `/sessions/${sessionId}`, { method: 'DELETE' }),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
      invalidatesTags: ['Sessions'],
    }),

    revokeAllSessions: builder.mutation<{ message: string }, void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 400));
          return { data: { message: 'All other sessions revoked' } };
        }
        const result = await baseQuery(
          serviceQuery('auth', '/sessions', { method: 'DELETE' }),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<{ message: string }>(result.data) };
      },
      invalidatesTags: ['Sessions'],
    }),

    getLoginHistory: builder.query<PaginatedResponse<LoginHistoryEntry>, { page?: number; limit?: number }>({
      queryFn: async ({ page = 1, limit = 20 }, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 400));
          return { data: paginate(MOCK_LOGIN_HISTORY, page, limit) };
        }
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        const result = await baseQuery(
          serviceQuery('auth', `/auth/login-history?${params}`),
        );
        if (result.error) return { error: result.error };
        return { data: unwrapApiResponse<PaginatedResponse<LoginHistoryEntry>>(result.data) };
      },
      providesTags: ['LoginHistory'],
    }),

    getDevices: builder.query<TrustedDevice[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          return { data: MOCK_DEVICES };
        }
        const sessionsResult = await baseQuery(serviceQuery('auth', '/sessions?limit=50'));
        if (sessionsResult.error) return { error: sessionsResult.error };
        const sessions = unwrapApiResponse<PaginatedResponse<AuthSession>>(sessionsResult.data);
        return { data: sessionsToDevices(sessions.data) };
      },
      providesTags: ['Devices'],
    }),

    getMfaStatus: builder.query<{ mfaEnabled: boolean }, void>({
      query: () => serviceQuery('auth', '/mfa/status'),
      transformResponse: unwrapApiResponse<{ mfaEnabled: boolean }>,
      providesTags: ['Mfa'],
    }),

    setupMfa: builder.mutation<{ secret: string; qrCodeUrl: string; backupCodes: string[] }, void>({
      query: () => serviceQuery('auth', '/mfa/setup', { method: 'POST' }),
      transformResponse: unwrapApiResponse<{ secret: string; qrCodeUrl: string; backupCodes: string[] }>,
    }),

    verifyMfaSetup: builder.mutation<{ message: string }, { code: string }>({
      query: (body) => serviceQuery('auth', '/mfa/setup/verify', { method: 'POST', body }),
      transformResponse: unwrapApiResponse<{ message: string }>,
      invalidatesTags: ['Mfa'],
    }),

    disableMfa: builder.mutation<{ message: string }, { password: string; code: string }>({
      query: (body) => serviceQuery('auth', '/mfa/disable', { method: 'POST', body }),
      transformResponse: unwrapApiResponse<{ message: string }>,
      invalidatesTags: ['Mfa'],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useRevokeSessionMutation,
  useRevokeAllSessionsMutation,
  useGetLoginHistoryQuery,
  useGetDevicesQuery,
  useGetMfaStatusQuery,
  useSetupMfaMutation,
  useVerifyMfaSetupMutation,
  useDisableMfaMutation,
} = securityApi;
