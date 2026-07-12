import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from '@/utils/api-mock';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_CLEARANCES,
  MOCK_APPROVALS,
  type MedicalAppointment,
  type MedicalClearance,
  type MedicalApproval,
} from '../constants/medical-data';

function mapAppointment(raw: Record<string, unknown>): MedicalAppointment {
  const facility = raw.facility as { name?: string } | undefined;
  const scheduledAt = (raw.scheduledAt as string) ?? new Date().toISOString();
  const d = new Date(scheduledAt);
  return {
    id: raw.id as string,
    appointmentNumber: (raw.appointmentNumber as string) ?? `MAP-${String(raw.id).slice(0, 8)}`,
    personnelName: (raw.personnelName as string) ?? (raw.userName as string) ?? '—',
    department: (raw.department as string) ?? '—',
    medicalProfessional: (raw.providerName as string) ?? (raw.medicalProfessional as string) ?? '—',
    date: d.toISOString().slice(0, 10),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    location: facility?.name ?? (raw.facilityName as string) ?? (raw.location as string) ?? '—',
    appointmentType: (raw.type as string) ?? (raw.appointmentType as string) ?? 'Consultation',
    status: (raw.status as MedicalAppointment['status']) ?? 'SCHEDULED',
  };
}

function mapClearance(raw: Record<string, unknown>): MedicalClearance {
  return {
    id: raw.id as string,
    personnelName: (raw.personnelName as string) ?? (raw.userName as string) ?? '—',
    clearanceType: (raw.type as string) ?? (raw.clearanceType as string) ?? 'Medical Clearance',
    issueDate: (raw.validFrom as string) ?? (raw.issuedAt as string) ?? (raw.issueDate as string) ?? '—',
    expiryDate: (raw.validUntil as string) ?? (raw.expiryDate as string) ?? '—',
    status: mapCertStatus(raw.status as string),
    approvedBy: (raw.issuedByName as string) ?? (raw.approvedBy as string) ?? '—',
  };
}

function mapCertStatus(status: string): MedicalClearance['status'] {
  if (status === 'ISSUED') return 'CLEARED';
  if (status === 'REVOKED') return 'REVOKED';
  if (status === 'EXPIRED') return 'EXPIRED';
  if (status === 'DRAFT') return 'PENDING';
  return status as MedicalClearance['status'];
}

export const medicalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalAppointments: builder.query<PaginatedResponse<MedicalAppointment>, { page?: number; limit?: number; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const path = params.mine ? '/appointments/me' : '/appointments';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        const result = await baseQuery(serviceQuery('medical', `${path}?${qs}`));
        if (result.error) {
          return { data: paginate(MOCK_APPOINTMENTS, params.page ?? 1, params.limit ?? 20) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapAppointment) } };
      },
      providesTags: ['MedicalAppointments'],
    }),

    getMedicalClearances: builder.query<MedicalClearance[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/certificates'));
        if (result.error) {
          return { data: MOCK_CLEARANCES };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapClearance) };
      },
      providesTags: ['MedicalClearances'],
    }),

    getPendingMedicalApprovals: builder.query<MedicalApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/medical-approvals/pending'));
        if (result.error) {
          return { data: MOCK_APPROVALS };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalApproval[] };
      },
      providesTags: ['MedicalApprovals'],
    }),

    // MUTATIONS
    scheduleAppointment: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/appointments', { method: 'POST', body }),
      invalidatesTags: ['MedicalAppointments'],
    }),
    updateAppointmentStatus: builder.mutation<void, { id: string; status: string; comments?: string }>({
      query: ({ id, status, comments }) => serviceQuery('medical', `/appointments/${id}/status`, { method: 'PATCH', body: { status, comments } }),
      invalidatesTags: ['MedicalAppointments'],
    }),
    issueClearance: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/certificates', { method: 'POST', body }),
      invalidatesTags: ['MedicalClearances'],
    }),
    actionMedicalApproval: builder.mutation<void, { id: string; action: string; comments?: string }>({
      query: ({ id, action, comments }) => serviceQuery('medical', `/medical-approvals/${id}/action`, { method: 'POST', body: { action, comments } }),
      invalidatesTags: ['MedicalApprovals'],
    }),
    createReferral: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/referrals', { method: 'POST', body }),
    }),
    reportIncident: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/incidents', { method: 'POST', body }),
    }),
    createAssessment: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/assessments', { method: 'POST', body }),
    }),
  }),
});

export const {
  useGetMedicalAppointmentsQuery,
  useGetMedicalClearancesQuery,
  useGetPendingMedicalApprovalsQuery,
  useScheduleAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useIssueClearanceMutation,
  useActionMedicalApprovalMutation,
  useCreateReferralMutation,
  useReportIncidentMutation,
  useCreateAssessmentMutation,
} = medicalApi;
