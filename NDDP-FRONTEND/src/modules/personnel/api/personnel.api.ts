import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_PERSONNEL,
  MOCK_DEPARTMENTS,
  MOCK_UNITS,
  MOCK_QUALIFICATIONS,
  MOCK_TRANSFERS,
  MOCK_PROMOTIONS,
  MOCK_SERVICE_HISTORY,
  type PersonnelRecord,
  type PersonnelDepartment,
  type PersonnelUnit,
  type QualificationRecord,
  type TransferRecord,
  type PromotionRecord,
  type ServiceHistoryEntry,
} from '../constants/personnel-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function mapApiPersonnel(raw: Record<string, unknown>): PersonnelRecord {
  const rank = raw.currentRank as { name?: string } | string | undefined;
  const assignment = raw.currentAssignment as { unit?: { name?: string }; position?: string } | undefined;
  return {
    id: raw.id as string,
    userId: raw.userId as string | undefined,
    serviceNumber: (raw.serviceNumber as string) ?? '—',
    employeeNumber: (raw.employeeNumber as string) ?? '—',
    firstName: raw.firstName as string,
    lastName: raw.lastName as string,
    email: (raw.email as string) ?? '—',
    department: assignment?.unit?.name ?? (raw.branch as string) ?? '—',
    unit: assignment?.unit?.name ?? '—',
    position: assignment?.position ?? (typeof rank === 'object' ? rank?.name : rank) ?? '—',
    rank: typeof rank === 'object' ? rank?.name : (rank as string | undefined),
    employmentType: 'PERMANENT',
    serviceStatus: (raw.serviceStatus as PersonnelRecord['serviceStatus']) ?? 'ACTIVE',
    workLocation: 'Kigali HQ',
    hireDate: (raw.enlistmentDate as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
    yearsOfService: Number(raw.yearsOfService ?? 0),
    branch: (raw.branch as string) ?? 'ARMY',
    nationalId: raw.nationalId as string | undefined,
    maritalStatus: raw.maritalStatus as string | undefined,
  };
}

export const personnelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonnel: builder.query<PaginatedResponse<PersonnelRecord>, { page?: number; limit?: number; search?: string; serviceStatus?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          let items = [...MOCK_PERSONNEL];
          if (params.search) {
            const q = params.search.toLowerCase();
            items = items.filter((p) =>
              p.firstName.toLowerCase().includes(q) ||
              p.lastName.toLowerCase().includes(q) ||
              p.email.toLowerCase().includes(q) ||
              p.serviceNumber.toLowerCase().includes(q) ||
              p.employeeNumber.toLowerCase().includes(q),
            );
          }
          if (params.serviceStatus) items = items.filter((p) => p.serviceStatus === params.serviceStatus);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.search) qs.set('search', params.search);
        if (params.serviceStatus) qs.set('serviceStatus', params.serviceStatus);
        const result = await baseQuery(serviceQuery('personnel', `/personnel?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapApiPersonnel) } };
      },
      providesTags: ['Personnel'],
    }),

    getPersonnelById: builder.query<PersonnelRecord, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          const person = MOCK_PERSONNEL.find((p) => p.id === id);
          if (!person) return { error: { status: 404, data: { message: 'Personnel not found' } } };
          return { data: person };
        }
        const result = await baseQuery(serviceQuery('personnel', `/personnel/${id}`));
        if (result.error) return { error: result.error };
        return { data: mapApiPersonnel(unwrapApiResponse<Record<string, unknown>>(result.data)) };
      },
      providesTags: (_r, _e, id) => [{ type: 'Personnel', id }],
    }),

    getPersonnelDepartments: builder.query<PersonnelDepartment[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_DEPARTMENTS };
      },
      providesTags: ['PersonnelDepartments'],
    }),

    getPersonnelUnits: builder.query<PersonnelUnit[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_UNITS };
        }
        const result = await baseQuery(serviceQuery('personnel', '/units'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return {
          data: raw.map((u) => ({
            id: u.id as string,
            name: u.name as string,
            code: (u.code as string) ?? '—',
            department: (u.departmentName as string) ?? '—',
            head: (u.headName as string) ?? '—',
            personnelCount: (u.personnelCount as number) ?? 0,
            status: ((u.status as string) ?? 'ACTIVE') as PersonnelUnit['status'],
          })),
        };
      },
      providesTags: ['PersonnelUnits'],
    }),

    getPersonnelQualifications: builder.query<QualificationRecord[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_QUALIFICATIONS };
      },
      providesTags: ['PersonnelQualifications'],
    }),

    getPersonnelTransfers: builder.query<TransferRecord[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_TRANSFERS };
      },
      providesTags: ['PersonnelTransfers'],
    }),

    getPersonnelPromotions: builder.query<PromotionRecord[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_PROMOTIONS };
      },
      providesTags: ['PersonnelPromotions'],
    }),

    getServiceHistory: builder.query<ServiceHistoryEntry[], string>({
      queryFn: async (personnelId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_SERVICE_HISTORY.filter((h) => h.personnelId === personnelId) };
        }
        const result = await baseQuery(serviceQuery('personnel', `/personnel/${personnelId}/service-history`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<{ data: Record<string, unknown>[] }>(result.data);
        return {
          data: raw.data.map((h) => ({
            id: h.id as string,
            personnelId,
            event: h.eventType as string,
            description: (h.description as string) ?? '',
            date: h.eventDate as string,
            performedBy: h.performedBy as string | undefined,
          })),
        };
      },
      providesTags: ['PersonnelHistory'],
    }),
  }),
});

export const {
  useGetPersonnelQuery,
  useGetPersonnelByIdQuery,
  useGetPersonnelDepartmentsQuery,
  useGetPersonnelUnitsQuery,
  useGetPersonnelQualificationsQuery,
  useGetPersonnelTransfersQuery,
  useGetPersonnelPromotionsQuery,
  useGetServiceHistoryQuery,
} = personnelApi;
