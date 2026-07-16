import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_PROGRAMS,
  MOCK_ASSISTANCE_REQUESTS,
  MOCK_APPLICATIONS,
  type WelfareProgram,
  type AssistanceRequest,
  type WelfareApplication,
} from '../constants/welfare-data';



function mapProgram(raw: Record<string, unknown>): WelfareProgram {
  return {
    id: raw.id as string,
    name: raw.name as string,
    category: (raw.category as string) ?? '—',
    startDate: (raw.startDate as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
    endDate: raw.endDate as string | undefined,
    eligiblePersonnel: (raw.eligibilityCriteria as string) ?? (raw.eligiblePersonnel as string) ?? 'All Staff',
    budget: raw.budget as number | undefined,
    coordinator: (raw.coordinatorName as string) ?? '—',
    status: ((raw.status as string) ?? 'ACTIVE') as WelfareProgram['status'],
    participants: raw.participantCount as number | undefined,
  };
}

function mapClaim(raw: Record<string, unknown>): AssistanceRequest {
  const program = raw.program as { name?: string } | undefined;
  return {
    id: raw.id as string,
    requestNumber: (raw.claimNumber as string) ?? (raw.requestNumber as string) ?? `WF-${String(raw.id).slice(0, 8)}`,
    employeeName: (raw.employeeName as string) ?? (raw.userName as string) ?? '—',
    department: (raw.department as string) ?? '—',
    program: program?.name ?? (raw.programName as string) ?? '—',
    assistanceType: (raw.assistanceType as string) ?? program?.name ?? 'Assistance',
    amountRequested: raw.requestedAmount as number | undefined,
    reason: raw.reason as string | undefined,
    status: (raw.status as AssistanceRequest['status']) ?? 'PENDING',
    submittedAt: raw.submittedAt as string | undefined,
    assignedOfficer: raw.assignedOfficer as string | undefined,
  };
}

export const welfareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWelfarePrograms: builder.query<WelfareProgram[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_PROGRAMS };
        }
        const result = await baseQuery(serviceQuery('welfare', '/programs/active'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapProgram) };
      },
      providesTags: ['WelfarePrograms'],
    }),

    getAssistanceRequests: builder.query<PaginatedResponse<AssistanceRequest>, { page?: number; limit?: number; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(300);
          return { data: paginate(MOCK_ASSISTANCE_REQUESTS, params.page ?? 1, params.limit ?? 20) };
        }
        const path = params.mine ? '/claims/me' : '/claims';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        const result = await baseQuery(serviceQuery('welfare', `${path}?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapClaim) } };
      },
      providesTags: ['WelfareClaims'],
    }),

    getPendingWelfareApprovals: builder.query<AssistanceRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_ASSISTANCE_REQUESTS.filter((r) => r.status === 'PENDING' || r.status === 'IN_PROGRESS') };
        }
        const result = await baseQuery(serviceQuery('welfare', '/claims/pending-review'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[] | { data: Record<string, unknown>[] }>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapClaim) };
      },
      providesTags: ['WelfareApprovals'],
    }),

    getWelfareApplications: builder.query<WelfareApplication[], void>({
      queryFn: async () => {
        await mockDelay(200);
        return { data: MOCK_APPLICATIONS };
      },
      providesTags: ['WelfareApplications'],
    }),
  }),
});

export const {
  useGetWelfareProgramsQuery,
  useGetAssistanceRequestsQuery,
  useGetPendingWelfareApprovalsQuery,
  useGetWelfareApplicationsQuery,
} = welfareApi;
