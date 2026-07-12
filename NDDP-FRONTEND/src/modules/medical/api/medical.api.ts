import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from '@/utils/api-mock';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_CLEARANCES,
  MOCK_APPROVALS,
  MOCK_PROFILES,
  MOCK_ASSESSMENTS,
  MOCK_VACCINATIONS,
  MOCK_LAB_RESULTS,
  MOCK_REFERRALS,
  MOCK_DOCUMENTS,
  MOCK_INCIDENTS,
  MOCK_FITNESS,
  MOCK_MEDICAL_HISTORY,
  MOCK_CAMPAIGNS,
  type MedicalAppointment,
  type MedicalClearance,
  type MedicalApproval,
  type MedicalProfile,
  type MedicalAssessment,
  type VaccinationRecord,
  type LabResult,
  type MedicalReferral,
  type MedicalDocument,
  type MedicalIncident,
  type FitnessRecord,
  type MedicalHistoryEntry,
  type HealthCampaign,
} from '../constants/medical-data';

/* ─── Mappers ────────────────────────────────────────────────────────────── */

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

function mapProfile(raw: Record<string, unknown>): MedicalProfile {
  return {
    id: raw.id as string,
    personnelNumber: (raw.personnelNumber as string) ?? (raw.serviceNumber as string) ?? '—',
    firstName: (raw.firstName as string) ?? '—',
    lastName: (raw.lastName as string) ?? '—',
    department: (raw.department as string) ?? '—',
    age: Number(raw.age ?? 0),
    bloodGroup: raw.bloodGroup as string | undefined,
    emergencyContact: (raw.emergencyContact as string) ?? '—',
    medicalStatus: (raw.medicalStatus as MedicalProfile['medicalStatus']) ?? 'ACTIVE',
    fitnessStatus: (raw.fitnessStatus as string) ?? 'Unknown',
    clearanceStatus: (raw.clearanceStatus as string) ?? 'Unknown',
    nextAssessmentDate: raw.nextAssessmentDate as string | undefined,
  };
}

function mapAssessment(raw: Record<string, unknown>): MedicalAssessment {
  return {
    id: raw.id as string,
    personnelName: (raw.personnelName as string) ?? '—',
    category: (raw.category as string) ?? (raw.type as string) ?? '—',
    assessmentDate: (raw.assessmentDate as string) ?? (raw.scheduledAt as string) ?? new Date().toISOString(),
    examiner: (raw.examinerName as string) ?? (raw.examiner as string) ?? '—',
    status: (raw.status as MedicalAssessment['status']) ?? 'PENDING',
    followUpRequired: (raw.followUpRequired as boolean) ?? false,
  };
}

/* ─── API ────────────────────────────────────────────────────────────────── */

export const medicalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── QUERIES ──────────────────────────────────────────────────────────
    getMedicalAppointments: builder.query<PaginatedResponse<MedicalAppointment>, { page?: number; limit?: number; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const path = params.mine ? '/appointments/me' : '/appointments';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        const result = await baseQuery(serviceQuery('medical', `${path}?${qs}`));
        if (result.error) return { data: paginate(MOCK_APPOINTMENTS, params.page ?? 1, params.limit ?? 20) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapAppointment) } };
      },
      providesTags: ['MedicalAppointments'],
    }),

    getMedicalClearances: builder.query<MedicalClearance[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/certificates'));
        if (result.error) return { data: MOCK_CLEARANCES };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapClearance) };
      },
      providesTags: ['MedicalClearances'],
    }),

    getPendingMedicalApprovals: builder.query<MedicalApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/medical-approvals/pending'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalApproval[] };
      },
      providesTags: ['MedicalApprovals'],
    }),

    getMedicalProfiles: builder.query<MedicalProfile[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/personnel/profiles'));
        if (result.error) return { data: MOCK_PROFILES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapProfile) };
      },
      providesTags: ['MedicalProfiles'],
    }),

    getMedicalAssessments: builder.query<MedicalAssessment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/assessments'));
        if (result.error) return { data: MOCK_ASSESSMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapAssessment) };
      },
      providesTags: ['MedicalAssessments'],
    }),

    getVaccinationRecords: builder.query<VaccinationRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/vaccinations'));
        if (result.error) return { data: MOCK_VACCINATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as VaccinationRecord[] };
      },
      providesTags: ['MedicalVaccinations'],
    }),

    getLabResults: builder.query<LabResult[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/laboratory/results'));
        if (result.error) return { data: MOCK_LAB_RESULTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as LabResult[] };
      },
      providesTags: ['MedicalLabResults'],
    }),

    getMedicalReferrals: builder.query<MedicalReferral[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/referrals'));
        if (result.error) return { data: MOCK_REFERRALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalReferral[] };
      },
      providesTags: ['MedicalReferrals'],
    }),

    getMedicalDocuments: builder.query<MedicalDocument[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/documents'));
        if (result.error) return { data: MOCK_DOCUMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalDocument[] };
      },
      providesTags: ['MedicalDocuments'],
    }),

    getMedicalIncidents: builder.query<MedicalIncident[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/incidents'));
        if (result.error) return { data: MOCK_INCIDENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalIncident[] };
      },
      providesTags: ['MedicalIncidents'],
    }),

    getFitnessRecords: builder.query<FitnessRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/fitness-records'));
        if (result.error) return { data: MOCK_FITNESS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FitnessRecord[] };
      },
      providesTags: ['MedicalFitness'],
    }),

    getMedicalHistory: builder.query<MedicalHistoryEntry[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/history'));
        if (result.error) return { data: MOCK_MEDICAL_HISTORY };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MedicalHistoryEntry[] };
      },
      providesTags: ['MedicalHistory'],
    }),

    getHealthCampaigns: builder.query<HealthCampaign[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('medical', '/health-campaigns'));
        if (result.error) return { data: MOCK_CAMPAIGNS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as HealthCampaign[] };
      },
      providesTags: ['MedicalCampaigns'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
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
      invalidatesTags: ['MedicalReferrals'],
    }),
    reportIncident: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/incidents', { method: 'POST', body }),
      invalidatesTags: ['MedicalIncidents'],
    }),
    createAssessment: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/assessments', { method: 'POST', body }),
      invalidatesTags: ['MedicalAssessments'],
    }),
    addVaccination: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/vaccinations', { method: 'POST', body }),
      invalidatesTags: ['MedicalVaccinations'],
    }),
    uploadDocument: builder.mutation<void, any>({
      query: (body) => serviceQuery('medical', '/documents', { method: 'POST', body }),
      invalidatesTags: ['MedicalDocuments'],
    }),
  }),
});

export const {
  useGetMedicalAppointmentsQuery,
  useGetMedicalClearancesQuery,
  useGetPendingMedicalApprovalsQuery,
  useGetMedicalProfilesQuery,
  useGetMedicalAssessmentsQuery,
  useGetVaccinationRecordsQuery,
  useGetLabResultsQuery,
  useGetMedicalReferralsQuery,
  useGetMedicalDocumentsQuery,
  useGetMedicalIncidentsQuery,
  useGetFitnessRecordsQuery,
  useGetMedicalHistoryQuery,
  useGetHealthCampaignsQuery,
  useScheduleAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useIssueClearanceMutation,
  useActionMedicalApprovalMutation,
  useCreateReferralMutation,
  useReportIncidentMutation,
  useCreateAssessmentMutation,
  useAddVaccinationMutation,
  useUploadDocumentMutation,
} = medicalApi;
