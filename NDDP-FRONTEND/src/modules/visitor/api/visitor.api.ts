import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_SITES,
  MOCK_VISITORS,
  MOCK_VISITS,
  MOCK_PENDING,
  MOCK_CHECKINS,
  type VisitSite,
  type VisitorRecord,
  type VisitRequest,
  type CheckInLog,
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
    getVisitSites: builder.query<VisitSite[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_SITES };
        }
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_VISITORS };
        }
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_VISITS };
        }
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_PENDING };
        }
        const result = await baseQuery(serviceQuery('visitor', '/visits/pending'));
        if (result.error) return { data: MOCK_PENDING };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapVisit) };
      },
      providesTags: ['VisitRequests'],
    }),

    getCheckInLogs: builder.query<CheckInLog[], void>({
      queryFn: async () => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
        }
        // Backend exposes per-visit logs; use mock aggregate until list API exists
        return { data: MOCK_CHECKINS };
      },
      providesTags: ['CheckInLogs'],
    }),
  }),
});

export const {
  useGetVisitSitesQuery,
  useGetVisitorDirectoryQuery,
  useGetVisitRequestsQuery,
  useGetPendingVisitsQuery,
  useGetCheckInLogsQuery,
} = visitorApi;
