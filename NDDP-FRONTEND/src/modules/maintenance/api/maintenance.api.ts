import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_CATEGORIES,
  MOCK_REQUESTS,
  MOCK_PENDING,
  MOCK_WORK_ORDERS,
  type MaintenanceCategory,
  type MaintenanceRequest,
  type WorkOrder,
  type MaintenanceType,
  type MaintenancePriority,
  type MaintenanceStatus,
} from '../constants/maintenance-data';

function mapCategory(raw: Record<string, unknown>): MaintenanceCategory {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    description: (raw.description as string) ?? '—',
    requestCount: Number(raw.requestCount ?? 0),
    status: ((raw.status as string) ?? (raw.isActive ? 'ACTIVE' : 'INACTIVE')).toUpperCase() as MaintenanceStatus,
  };
}

function mapRequest(raw: Record<string, unknown>): MaintenanceRequest {
  return {
    id: raw.id as string,
    title: (raw.title as string) ?? (raw.summary as string) ?? '—',
    category: (raw.categoryName as string) ?? (raw.category as string) ?? '—',
    type: ((raw.maintenanceType as string) ?? (raw.type as string) ?? 'CORRECTIVE').toUpperCase() as MaintenanceType,
    asset: (raw.assetCode as string) ?? (raw.assetReference as string) ?? '—',
    priority: ((raw.priority as string) ?? 'MEDIUM').toUpperCase() as MaintenancePriority,
    requestedBy: (raw.requesterName as string) ?? (raw.createdBy as string) ?? '—',
    requestedAt: (raw.requestedAt as string) ?? (raw.createdAt as string) ?? '',
    status: ((raw.status as string) ?? 'PENDING').toUpperCase() as MaintenanceStatus,
  };
}

function mapWorkOrder(raw: Record<string, unknown>): WorkOrder {
  return {
    id: raw.id as string,
    title: (raw.title as string) ?? '—',
    type: ((raw.maintenanceType as string) ?? (raw.type as string) ?? 'CORRECTIVE').toUpperCase() as MaintenanceType,
    asset: (raw.assetCode as string) ?? (raw.assetReference as string) ?? '—',
    priority: ((raw.priority as string) ?? 'MEDIUM').toUpperCase() as MaintenancePriority,
    assignee: (raw.assignedToName as string) ?? (raw.assignedTo as string) ?? 'Unassigned',
    scheduledAt: (raw.scheduledAt as string) ?? (raw.startAt as string) ?? '',
    dueAt: raw.dueAt as string | undefined,
    status: ((raw.status as string) ?? 'SCHEDULED').toUpperCase() as MaintenanceStatus,
    progress: Number(raw.progressPercent ?? raw.progress ?? 0),
  };
}

export const maintenanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintenanceCategories: builder.query<MaintenanceCategory[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_CATEGORIES };
        }
        const result = await baseQuery(serviceQuery('maintenance', '/categories'));
        if (result.error) return { data: MOCK_CATEGORIES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapCategory) };
      },
      providesTags: ['MaintenanceCategories'],
    }),

    getMaintenanceRequests: builder.query<MaintenanceRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_REQUESTS };
        }
        const result = await baseQuery(serviceQuery('maintenance', '/requests?limit=50'));
        if (result.error) return { data: MOCK_REQUESTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapRequest) };
      },
      providesTags: ['MaintenanceRequests'],
    }),

    getPendingMaintenanceRequests: builder.query<MaintenanceRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_PENDING };
        }
        const result = await baseQuery(serviceQuery('maintenance', '/requests/pending'));
        if (result.error) return { data: MOCK_PENDING };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapRequest) };
      },
      providesTags: ['MaintenanceRequests'],
    }),

    getWorkOrders: builder.query<WorkOrder[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_WORK_ORDERS };
        }
        const result = await baseQuery(serviceQuery('maintenance', '/work-orders?limit=50'));
        if (result.error) return { data: MOCK_WORK_ORDERS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapWorkOrder) };
      },
      providesTags: ['WorkOrders'],
    }),
  }),
});

export const {
  useGetMaintenanceCategoriesQuery,
  useGetMaintenanceRequestsQuery,
  useGetPendingMaintenanceRequestsQuery,
  useGetWorkOrdersQuery,
} = maintenanceApi;
