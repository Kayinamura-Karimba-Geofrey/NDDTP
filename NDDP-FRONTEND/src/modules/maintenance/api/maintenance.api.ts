import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_CATEGORIES,
  MOCK_REQUESTS,
  MOCK_PENDING,
  MOCK_WORK_ORDERS,
  MOCK_TECHNICIANS,
  MOCK_PARTS,
  MOCK_PREVENTIVE,
  MOCK_SLA,
  type MaintenanceCategory,
  type MaintenanceRequest,
  type WorkOrder,
  type MaintenanceType,
  type MaintenancePriority,
  type MaintenanceStatus,
  type Technician,
  type MaintenancePart,
  type PreventiveSchedule,
  type SlaRule,
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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getMaintenanceCategories: builder.query<MaintenanceCategory[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
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
        const result = await baseQuery(serviceQuery('maintenance', '/work-orders?limit=50'));
        if (result.error) return { data: MOCK_WORK_ORDERS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapWorkOrder) };
      },
      providesTags: ['WorkOrders'],
    }),

    getMaintenanceTechnicians: builder.query<Technician[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('maintenance', '/technicians'));
        if (result.error) return { data: MOCK_TECHNICIANS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Technician[] };
      },
      providesTags: ['MaintenanceTechnicians'],
    }),

    getMaintenanceParts: builder.query<MaintenancePart[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('maintenance', '/parts'));
        if (result.error) return { data: MOCK_PARTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MaintenancePart[] };
      },
      providesTags: ['MaintenanceParts'],
    }),

    getMaintenancePreventive: builder.query<PreventiveSchedule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('maintenance', '/preventive-schedules'));
        if (result.error) return { data: MOCK_PREVENTIVE };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PreventiveSchedule[] };
      },
      providesTags: ['MaintenancePreventive'],
    }),

    getMaintenanceSla: builder.query<SlaRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('maintenance', '/sla-rules'));
        if (result.error) return { data: MOCK_SLA };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as SlaRule[] };
      },
      providesTags: ['MaintenanceSla'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createMaintenanceCategory: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/categories', { method: 'POST', body }),
      invalidatesTags: ['MaintenanceCategories'],
    }),

    createMaintenanceRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/requests', { method: 'POST', body }),
      invalidatesTags: ['MaintenanceRequests'],
    }),

    createWorkOrder: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/work-orders', { method: 'POST', body }),
      invalidatesTags: ['WorkOrders', 'MaintenanceRequests'],
    }),

    createTechnician: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/technicians', { method: 'POST', body }),
      invalidatesTags: ['MaintenanceTechnicians'],
    }),

    createMaintenancePart: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/parts', { method: 'POST', body }),
      invalidatesTags: ['MaintenanceParts'],
    }),

    createPreventiveSchedule: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/preventive-schedules', { method: 'POST', body }),
      invalidatesTags: ['MaintenancePreventive'],
    }),

    createSlaRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('maintenance', '/sla-rules', { method: 'POST', body }),
      invalidatesTags: ['MaintenanceSla'],
    }),

    processMaintenanceRequestApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('maintenance', `/requests/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['MaintenanceRequests', 'WorkOrders'],
    }),
  }),
});

export const {
  useGetMaintenanceCategoriesQuery,
  useGetMaintenanceRequestsQuery,
  useGetPendingMaintenanceRequestsQuery,
  useGetWorkOrdersQuery,
  useGetMaintenanceTechniciansQuery,
  useGetMaintenancePartsQuery,
  useGetMaintenancePreventiveQuery,
  useGetMaintenanceSlaQuery,
  useCreateMaintenanceCategoryMutation,
  useCreateMaintenanceRequestMutation,
  useCreateWorkOrderMutation,
  useCreateTechnicianMutation,
  useCreateMaintenancePartMutation,
  useCreatePreventiveScheduleMutation,
  useCreateSlaRuleMutation,
  useProcessMaintenanceRequestApprovalMutation,
} = maintenanceApi;
