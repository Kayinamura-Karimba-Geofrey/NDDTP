import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import { SHARED_DEPARTMENTS } from '@/constants/shared-departments';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_PERSONNEL,
  MOCK_UNITS,
  MOCK_QUALIFICATIONS,
  MOCK_TRANSFERS,
  MOCK_PROMOTIONS,
  MOCK_SERVICE_HISTORY,
  MOCK_POSITIONS,
  MOCK_SKILLS,
  MOCK_AWARDS,
  MOCK_DOCUMENTS,
  MOCK_DEPENDENTS,
  MOCK_EMERGENCY_CONTACTS,
  type PersonnelRecord,
  type PersonnelDepartment,
  type PersonnelUnit,
  type QualificationRecord,
  type TransferRecord,
  type PromotionRecord,
  type ServiceHistoryEntry,
  type PersonnelPosition,
  type SkillRecord,
  type AwardRecord,
  type PersonnelDocument,
  type DependentRecord,
  type EmergencyContact,
} from '../constants/personnel-data';

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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getPersonnel: builder.query<PaginatedResponse<PersonnelRecord>, { page?: number; limit?: number; search?: string; serviceStatus?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.search) qs.set('search', params.search);
        if (params.serviceStatus) qs.set('serviceStatus', params.serviceStatus);
        const result = await baseQuery(serviceQuery('personnel', `/personnel?${qs}`));
        if (result.error) {
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
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapApiPersonnel) } };
      },
      providesTags: ['Personnel'],
    }),

    getPersonnelById: builder.query<PersonnelRecord, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', `/personnel/${id}`));
        if (result.error) {
          const person = MOCK_PERSONNEL.find((p) => p.id === id);
          if (!person) return { error: { status: 404, data: { message: 'Personnel not found' } } };
          return { data: person };
        }
        return { data: mapApiPersonnel(unwrapApiResponse<Record<string, unknown>>(result.data)) };
      },
      providesTags: (_r, _e, id) => [{ type: 'Personnel', id }],
    }),

    getPersonnelDepartments: builder.query<PersonnelDepartment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const mockDepartments: PersonnelDepartment[] = SHARED_DEPARTMENTS.map((d) => ({
          id: d.id,
          name: d.name,
          code: d.code,
          manager: d.manager,
          location: d.location,
          personnelCount: d.personnelCount,
          budgetRef: d.budgetRef,
          status: d.status,
        }));
        const result = await baseQuery(serviceQuery('user', '/departments?limit=100'));
        if (result.error) return { data: mockDepartments };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return {
          data: list.map((d) => ({
            id: d.id as string,
            name: d.name as string,
            code: (d.code as string) ?? '—',
            manager: (d.managerName as string) ?? (d.manager as string) ?? '—',
            location: (d.location as string) ?? 'Kigali HQ',
            personnelCount: (d.personnelCount as number) ?? (d.userCount as number) ?? 0,
            budgetRef: d.budgetRef as string | undefined,
            status: ((d.status as string) ?? 'ACTIVE') as PersonnelDepartment['status'],
          })),
        };
      },
      providesTags: ['PersonnelDepartments'],
    }),

    getPersonnelUnits: builder.query<PersonnelUnit[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/units'));
        if (result.error) return { data: MOCK_UNITS };
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
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/qualifications'));
        if (result.error) return { data: MOCK_QUALIFICATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as QualificationRecord[] };
      },
      providesTags: ['PersonnelQualifications'],
    }),

    getPersonnelTransfers: builder.query<TransferRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/transfers'));
        if (result.error) return { data: MOCK_TRANSFERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TransferRecord[] };
      },
      providesTags: ['PersonnelTransfers'],
    }),

    getPersonnelPromotions: builder.query<PromotionRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/promotions'));
        if (result.error) return { data: MOCK_PROMOTIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PromotionRecord[] };
      },
      providesTags: ['PersonnelPromotions'],
    }),

    getServiceHistory: builder.query<ServiceHistoryEntry[], string>({
      queryFn: async (personnelId, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', `/personnel/${personnelId}/service-history`));
        if (result.error) return { data: MOCK_SERVICE_HISTORY.filter((h) => h.personnelId === personnelId) };
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

    getPersonnelPositions: builder.query<PersonnelPosition[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/positions'));
        if (result.error) return { data: MOCK_POSITIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PersonnelPosition[] };
      },
      providesTags: ['PersonnelPositions'],
    }),

    getPersonnelSkills: builder.query<SkillRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/skills'));
        if (result.error) return { data: MOCK_SKILLS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as SkillRecord[] };
      },
      providesTags: ['PersonnelSkills'],
    }),

    getPersonnelAwards: builder.query<AwardRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/awards'));
        if (result.error) return { data: MOCK_AWARDS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AwardRecord[] };
      },
      providesTags: ['PersonnelAwards'],
    }),

    getPersonnelDocuments: builder.query<PersonnelDocument[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/documents'));
        if (result.error) return { data: MOCK_DOCUMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PersonnelDocument[] };
      },
      providesTags: ['PersonnelDocuments'],
    }),

    getDependents: builder.query<DependentRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/dependents'));
        if (result.error) return { data: MOCK_DEPENDENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as DependentRecord[] };
      },
      providesTags: ['PersonnelDependents'],
    }),

    getEmergencyContacts: builder.query<EmergencyContact[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/emergency-contacts'));
        if (result.error) return { data: MOCK_EMERGENCY_CONTACTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as EmergencyContact[] };
      },
      providesTags: ['PersonnelEmergencyContacts'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createPersonnel: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/personnel', { method: 'POST', body }),
      invalidatesTags: ['Personnel'],
    }),

    updatePersonnel: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => serviceQuery('personnel', `/personnel/${id}`, { method: 'PUT', body: data }),
      invalidatesTags: (_r, _e, { id }) => ['Personnel', { type: 'Personnel', id }],
    }),

    createDepartment: builder.mutation<void, any>({
      query: (body) => serviceQuery('user', '/departments', { method: 'POST', body }),
      invalidatesTags: ['PersonnelDepartments'],
    }),

    createUnit: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/units', { method: 'POST', body }),
      invalidatesTags: ['PersonnelUnits'],
    }),

    createPosition: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/positions', { method: 'POST', body }),
      invalidatesTags: ['PersonnelPositions'],
    }),

    initiateTransfer: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/transfers', { method: 'POST', body }),
      invalidatesTags: ['PersonnelTransfers', 'Personnel'],
    }),

    initiatePromotion: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/promotions', { method: 'POST', body }),
      invalidatesTags: ['PersonnelPromotions', 'Personnel'],
    }),

    addQualification: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/qualifications', { method: 'POST', body }),
      invalidatesTags: ['PersonnelQualifications'],
    }),

    addSkill: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/skills', { method: 'POST', body }),
      invalidatesTags: ['PersonnelSkills'],
    }),

    addDependent: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/dependents', { method: 'POST', body }),
      invalidatesTags: ['PersonnelDependents'],
    }),

    addEmergencyContact: builder.mutation<void, any>({
      query: (body) => serviceQuery('personnel', '/emergency-contacts', { method: 'POST', body }),
      invalidatesTags: ['PersonnelEmergencyContacts'],
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
  useGetPersonnelPositionsQuery,
  useGetPersonnelSkillsQuery,
  useGetPersonnelAwardsQuery,
  useGetPersonnelDocumentsQuery,
  useGetDependentsQuery,
  useGetEmergencyContactsQuery,
  useCreatePersonnelMutation,
  useUpdatePersonnelMutation,
  useCreateDepartmentMutation,
  useCreateUnitMutation,
  useCreatePositionMutation,
  useInitiateTransferMutation,
  useInitiatePromotionMutation,
  useAddQualificationMutation,
  useAddSkillMutation,
  useAddDependentMutation,
  useAddEmergencyContactMutation,
} = personnelApi;
