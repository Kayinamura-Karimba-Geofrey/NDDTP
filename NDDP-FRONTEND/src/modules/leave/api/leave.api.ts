import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from "@/utils/api-mock";

import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_LEAVE_REQUESTS,
  MOCK_BALANCES,
  MOCK_LEAVE_TYPES,
  type LeaveRequest,
  type LeaveBalance,
  type LeaveType,
} from '../constants/leave-data';

function mapLeaveRequest(raw: Record<string, unknown>): LeaveRequest {
  const leaveType = raw.leaveType as { id?: string; name?: string } | undefined;
  return {
    id: raw.id as string,
    requestNumber: (raw.requestNumber as string) ?? `LV-${String(raw.id).slice(0, 8)}`,
    userId: raw.userId as string,
    employeeName: (raw.employeeName as string) ?? (raw.userName as string) ?? '—',
    department: (raw.department as string) ?? '—',
    leaveTypeId: (raw.leaveTypeId as string) ?? leaveType?.id ?? '',
    leaveTypeName: leaveType?.name ?? (raw.leaveTypeName as string) ?? '—',
    startDate: raw.startDate as string,
    endDate: raw.endDate as string,
    totalDays: Number(raw.totalDays ?? raw.workingDays ?? 0),
    reason: raw.reason as string | undefined,
    status: (raw.status as LeaveRequest['status']) ?? 'DRAFT',
    submittedAt: raw.submittedAt as string | undefined,
    approver: raw.approverName as string | undefined,
  };
}

function mapLeaveBalance(raw: Record<string, unknown>): LeaveBalance {
  const leaveType = raw.leaveType as { id?: string; name?: string } | undefined;
  const total = Number(raw.totalDays ?? 0);
  const used = Number(raw.usedDays ?? 0);
  const pending = Number(raw.pendingDays ?? 0);
  return {
    id: raw.id as string,
    userId: raw.userId as string,
    employeeName: (raw.employeeName as string) ?? '—',
    department: (raw.department as string) ?? '—',
    leaveTypeId: (raw.leaveTypeId as string) ?? leaveType?.id ?? '',
    leaveTypeName: leaveType?.name ?? '—',
    year: Number(raw.year ?? new Date().getFullYear()),
    totalDays: total,
    usedDays: used,
    pendingDays: pending,
    availableDays: Number(raw.availableDays ?? total - used - pending),
    carryOverDays: raw.carryOverDays as number | undefined,
  };
}

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveRequests: builder.query<PaginatedResponse<LeaveRequest>, { page?: number; limit?: number; status?: string; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const path = params.mine ? '/leave-requests/me' : '/leave-requests';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.status) qs.set('status', params.status);
        const result = await baseQuery(serviceQuery('leave', `${path}?${qs}`));
        if (result.error) {
          let items = [...MOCK_LEAVE_REQUESTS];
          if (params.status) items = items.filter((r) => r.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapLeaveRequest) } };
      },
      providesTags: ['LeaveRequests'],
    }),

    getPendingApprovals: builder.query<LeaveRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('leave', '/leave-requests/pending-approvals'));
        if (result.error) {
          return { data: MOCK_LEAVE_REQUESTS.filter((r) => r.status === 'PENDING_APPROVAL') };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[] | { data: Record<string, unknown>[] }>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapLeaveRequest) };
      },
      providesTags: ['LeaveApprovals'],
    }),

    getMyLeaveBalances: builder.query<LeaveBalance[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('leave', '/leave-balances/me'));
        if (result.error) {
          return { data: MOCK_BALANCES.filter((b) => b.userId === 'u1') };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapLeaveBalance) };
      },
      providesTags: ['LeaveBalances'],
    }),

    getAllLeaveBalances: builder.query<LeaveBalance[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('leave', '/leave-balances'));
        if (result.error) {
          return { data: MOCK_BALANCES };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapLeaveBalance) };
      },
      providesTags: ['LeaveBalances'],
    }),

    getLeaveTypes: builder.query<LeaveType[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('leave', '/leave-types'));
        if (result.error) {
          return { data: MOCK_LEAVE_TYPES };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return {
          data: raw.map((t) => ({
            id: t.id as string,
            code: t.code as string,
            name: t.name as string,
            description: (t.description as string) ?? '',
            maxDays: Number(t.defaultDays ?? t.maxDays ?? 0),
            paid: (t.isPaid as boolean) ?? true,
            carryOverAllowed: (t.carryOverAllowed as boolean) ?? false,
            documentationRequired: (t.requiresDocumentation as boolean) ?? false,
            accrualType: (t.accrualType as LeaveType['accrualType']) ?? 'NONE',
          })),
        };
      },
      providesTags: ['LeaveTypes'],
    }),

    // MUTATIONS
    submitLeaveRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('leave', '/leave-requests', { method: 'POST', body }),
      invalidatesTags: ['LeaveRequests', 'LeaveBalances'],
    }),
    updateLeaveRequestStatus: builder.mutation<void, { id: string; status: string; comments?: string }>({
      query: ({ id, status, comments }) => serviceQuery('leave', `/leave-requests/${id}/status`, { method: 'PATCH', body: { status, comments } }),
      invalidatesTags: ['LeaveRequests', 'LeaveApprovals', 'LeaveBalances'],
    }),
    createPublicHoliday: builder.mutation<void, any>({
      query: (body) => serviceQuery('leave', '/public-holidays', { method: 'POST', body }),
    }),
    createLeaveType: builder.mutation<void, any>({
      query: (body) => serviceQuery('leave', '/leave-types', { method: 'POST', body }),
      invalidatesTags: ['LeaveTypes'],
    }),
    createDelegation: builder.mutation<void, any>({
      query: (body) => serviceQuery('leave', '/delegations', { method: 'POST', body }),
    }),
    adjustLeaveBalance: builder.mutation<void, any>({
      query: (body) => serviceQuery('leave', '/leave-balances/adjust', { method: 'POST', body }),
      invalidatesTags: ['LeaveBalances'],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  useGetPendingApprovalsQuery,
  useGetMyLeaveBalancesQuery,
  useGetAllLeaveBalancesQuery,
  useGetLeaveTypesQuery,
  useSubmitLeaveRequestMutation,
  useUpdateLeaveRequestStatusMutation,
  useCreatePublicHolidayMutation,
  useCreateLeaveTypeMutation,
  useCreateDelegationMutation,
  useAdjustLeaveBalanceMutation,
} = leaveApi;
