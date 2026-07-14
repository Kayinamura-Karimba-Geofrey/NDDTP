import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_SITES,
  MOCK_VISITORS,
  MOCK_VISITS,
  MOCK_PENDING,
  MOCK_CHECKINS,
  MOCK_BADGES,
  MOCK_BLACKLIST,
  type VisitSite,
  type VisitorRecord,
  type VisitRequest,
  type CheckInLog,
  type VisitorBadge,
  type BlacklistEntry,
  type SiteType,
  type IdDocumentType,
  type VisitorModuleStatus,
} from '../constants/visitor-data';

function mapSite(raw: Record<string, unknown>): VisitSite {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    type: ((raw.siteType as string) ?? (raw.type as string) ?? 'OTHER').toUpperCase() as SiteType,
    location: (raw.location as string) ?? (raw.address as string) ?? '—',
    capacity: Number(raw.capacity ?? 0),
    activeVisits: Number(raw.activeVisits ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as VisitorModuleStatus,
  };
}

function mapVisitor(raw: Record<string, unknown>): VisitorRecord {
  return {
    id: raw.id as string,
    name: (raw.fullName as string) ?? (raw.name as string) ?? '—',
    organization: (raw.organization as string) ?? (raw.company as string) ?? '—',
    phone: (raw.phone as string) ?? '—',
    email: (raw.email as string) ?? '—',
    idType: ((raw.idDocumentType as string) ?? 'NATIONAL_ID').toUpperCase() as IdDocumentType,
    idNumber: (raw.idNumber as string) ?? '—',
    visits: Number(raw.visitCount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as VisitorModuleStatus,
    lastVisit: raw.lastVisitAt as string | undefined,
  };
}

function mapVisit(raw: Record<string, unknown>): VisitRequest {
  const visitor = raw.visitor as { fullName?: string; name?: string } | undefined;
  const site = raw.site as { name?: string } | undefined;
  return {
    id: raw.id as string,
    visitor: visitor?.fullName ?? visitor?.name ?? (raw.visitorName as string) ?? '—',
    host: (raw.hostName as string) ?? (raw.hostId as string) ?? '—',
    site: site?.name ?? (raw.siteName as string) ?? '—',
    purpose: (raw.purpose as string) ?? '—',
    scheduledAt: (raw.scheduledAt as string) ?? (raw.startAt as string) ?? '',
    status: ((raw.status as string) ?? 'PENDING').toUpperCase() as VisitorModuleStatus,
    badge: raw.badgeNumber as string | undefined,
  };
}

export const visitorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getVisitSites: builder.query<VisitSite[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/sites'));
        if (result.error) return { data: MOCK_SITES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapSite) };
      },
      providesTags: ['VisitSites'],
    }),

    getVisitorDirectory: builder.query<VisitorRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/visitors?limit=50'));
        if (result.error) return { data: MOCK_VISITORS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapVisitor) };
      },
      providesTags: ['VisitorDirectory'],
    }),

    getVisitRequests: builder.query<VisitRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/visits?limit=50'));
        if (result.error) return { data: MOCK_VISITS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapVisit) };
      },
      providesTags: ['VisitRequests'],
    }),

    getPendingVisits: builder.query<VisitRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/visits/pending'));
        if (result.error) return { data: MOCK_PENDING };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapVisit) };
      },
      providesTags: ['VisitRequests'],
    }),

    getCheckInLogs: builder.query<CheckInLog[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/check-ins?limit=50'));
        if (result.error) return { data: MOCK_CHECKINS };
        const raw = unwrapApiResponse<CheckInLog[]>(result.data);
        return { data: raw };
      },
      providesTags: ['CheckInLogs'],
    }),

    getVisitorBlacklist: builder.query<BlacklistEntry[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/blacklist'));
        if (result.error) return { data: MOCK_BLACKLIST };
        const raw = unwrapApiResponse<BlacklistEntry[]>(result.data);
        return { data: raw };
      },
      providesTags: ['VisitorBlacklist'],
    }),

    getVisitorBadges: builder.query<VisitorBadge[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('visitor', '/badges'));
        if (result.error) return { data: MOCK_BADGES };
        const raw = unwrapApiResponse<VisitorBadge[]>(result.data);
        return { data: raw };
      },
      providesTags: ['VisitorBadges'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createVisitSite: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/sites', { method: 'POST', body }),
      invalidatesTags: ['VisitSites'],
    }),

    createVisitor: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/visitors', { method: 'POST', body }),
      invalidatesTags: ['VisitorDirectory'],
    }),

    createVisitRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/visits', { method: 'POST', body }),
      invalidatesTags: ['VisitRequests'],
    }),

    processVisitApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('visitor', `/visits/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['VisitRequests'],
    }),

    recordCheckIn: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/check-ins', { method: 'POST', body }),
      invalidatesTags: ['CheckInLogs', 'VisitRequests'],
    }),

    recordCheckOut: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('visitor', `/check-ins/${id}/checkout`, { method: 'POST' }),
      invalidatesTags: ['CheckInLogs', 'VisitRequests'],
    }),

    blacklistVisitor: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/blacklist', { method: 'POST', body }),
      invalidatesTags: ['VisitorBlacklist', 'VisitorDirectory'],
    }),

    unblacklistVisitor: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('visitor', `/blacklist/${id}`, { method: 'DELETE' }),
      invalidatesTags: ['VisitorBlacklist', 'VisitorDirectory'],
    }),

    issueBadge: builder.mutation<void, any>({
      query: (body) => serviceQuery('visitor', '/badges', { method: 'POST', body }),
      invalidatesTags: ['VisitorBadges'],
    }),
  }),
});

export const {
  useGetVisitSitesQuery,
  useGetVisitorDirectoryQuery,
  useGetVisitRequestsQuery,
  useGetPendingVisitsQuery,
  useGetCheckInLogsQuery,
  useGetVisitorBlacklistQuery,
  useGetVisitorBadgesQuery,
  useCreateVisitSiteMutation,
  useCreateVisitorMutation,
  useCreateVisitRequestMutation,
  useProcessVisitApprovalMutation,
  useRecordCheckInMutation,
  useRecordCheckOutMutation,
  useBlacklistVisitorMutation,
  useUnblacklistVisitorMutation,
  useIssueBadgeMutation,
} = visitorApi;
