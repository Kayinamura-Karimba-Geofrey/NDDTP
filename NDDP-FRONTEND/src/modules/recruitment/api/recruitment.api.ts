import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from '@/utils/api-mock';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_VACANCIES,
  MOCK_APPLICATIONS,
  MOCK_INTERVIEWS,
  MOCK_REQUISITIONS,
  MOCK_WORKFORCE_REQUESTS,
  MOCK_OFFERS,
  MOCK_CANDIDATES,
  MOCK_ASSESSMENTS,
  MOCK_TALENT_POOL,
  RECRUITMENT_PIPELINE,
  type Vacancy,
  type Application,
  type Interview,
  type JobRequisition,
  type WorkforceRequest,
  type Offer,
  type Candidate,
  type Assessment,
  type TalentPoolCandidate,
} from '../constants/recruitment-data';

function mapVacancy(raw: Record<string, unknown>): Vacancy {
  return {
    id: raw.id as string,
    vacancyNumber: (raw.referenceNumber as string) ?? `VAC-${String(raw.id).slice(0, 8)}`,
    jobTitle: (raw.title as string) ?? '—',
    department: (raw.department as string) ?? '—',
    location: (raw.location as string) ?? 'Kigali HQ',
    employmentType: (raw.employmentType as string) ?? 'Permanent',
    openDate: (raw.publishedAt as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
    closingDate: (raw.closingDate as string) ?? '—',
    applicationsReceived: (raw.applicationCount as number) ?? 0,
    status: ((raw.status as string) ?? 'DRAFT') as Vacancy['status'],
  };
}

function mapApplication(raw: Record<string, unknown>): Application {
  const candidate = raw.candidate as Record<string, unknown> | undefined;
  const posting = raw.jobPosting as Record<string, unknown> | undefined;
  return {
    id: raw.id as string,
    applicationNumber: (raw.applicationNumber as string) ?? `APP-${String(raw.id).slice(0, 8)}`,
    candidateId: (raw.candidateId as string) ?? (candidate?.id as string) ?? '',
    candidateName: candidate ? `${candidate.firstName} ${candidate.lastName}` : '—',
    position: (posting?.title as string) ?? '—',
    department: (posting?.department as string) ?? '—',
    applicationDate: (raw.submittedAt as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
    status: (raw.status as Application['status']) ?? 'SUBMITTED',
    recruiter: raw.assignedRecruiterId as string | undefined,
    vacancyId: (raw.jobPostingId as string) ?? (posting?.id as string),
  };
}

export const recruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<PaginatedResponse<Vacancy>, { page?: number; limit?: number; search?: string; status?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.search) qs.set('search', params.search);
        if (params.status) qs.set('status', params.status);
        const result = await baseQuery(serviceQuery('recruitment', `/job-postings?${qs}`));
        if (result.error) {
          // Fallback to mock on error during transition
          let items = [...MOCK_VACANCIES];
          if (params.status) items = items.filter((v) => v.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapVacancy) } };
      },
      providesTags: ['RecruitmentVacancies'],
    }),

    getApplications: builder.query<PaginatedResponse<Application>, { page?: number; limit?: number; status?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.status) qs.set('status', params.status);
        const result = await baseQuery(serviceQuery('recruitment', `/applications?${qs}`));
        if (result.error) {
          let items = [...MOCK_APPLICATIONS];
          if (params.status) items = items.filter((a) => a.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapApplication) } };
      },
      providesTags: ['RecruitmentApplications'],
    }),

    getApplicationById: builder.query<Application, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('recruitment', `/applications/${id}`));
        if (result.error) {
          const app = MOCK_APPLICATIONS.find((a) => a.id === id);
          if (!app) return { error: { status: 404, data: { message: 'Not found' } } };
          return { data: app };
        }
        return { data: mapApplication(unwrapApiResponse<Record<string, unknown>>(result.data)) };
      },
      providesTags: (_r, _e, id) => [{ type: 'RecruitmentApplications', id }],
    }),

    getPipelineStats: builder.query<{ stage: string; count: number }[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('recruitment', '/applications/pipeline/stats'));
        if (result.error) return { data: RECRUITMENT_PIPELINE };
        const stats = unwrapApiResponse<Record<string, number>>(result.data);
        const mapping: Record<string, string> = {
          SUBMITTED: 'Applications', SCREENING: 'Screened', SHORTLISTED: 'Shortlisted',
          INTERVIEW: 'Interviewed', OFFERED: 'Offer Sent', HIRED: 'Onboarded',
        };
        return { data: Object.entries(stats).map(([k, v]) => ({ stage: mapping[k] ?? k, count: v })) };
      },
      providesTags: ['RecruitmentPipeline'],
    }),

    getInterviews: builder.query<Interview[], void>({
      queryFn: async () => {
        // Fallback to mock for now since list interviews endpoint needs an applicationId
        return { data: MOCK_INTERVIEWS };
      },
      providesTags: ['RecruitmentInterviews'],
    }),

    // MUTATIONS
    createVacancy: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/job-postings', { method: 'POST', body }),
      invalidatesTags: ['RecruitmentVacancies'],
    }),
    publishVacancy: builder.mutation<void, string>({
      query: (id) => serviceQuery('recruitment', `/job-postings/${id}/publish`, { method: 'POST' }),
      invalidatesTags: ['RecruitmentVacancies'],
    }),
    closeVacancy: builder.mutation<void, string>({
      query: (id) => serviceQuery('recruitment', `/job-postings/${id}/close`, { method: 'POST' }),
      invalidatesTags: ['RecruitmentVacancies'],
    }),
    updateApplicationStatus: builder.mutation<void, { id: string; status: string; notes?: string }>({
      query: ({ id, status, notes }) => serviceQuery('recruitment', `/applications/${id}/status`, { method: 'PATCH', body: { status, notes } }),
      invalidatesTags: ['RecruitmentApplications', 'RecruitmentPipeline'],
    }),
    scheduleInterview: builder.mutation<void, { applicationId: string; dto: any }>({
      query: ({ applicationId, dto }) => serviceQuery('recruitment', `/interviews/applications/${applicationId}`, { method: 'POST', body: dto }),
      invalidatesTags: ['RecruitmentInterviews', 'RecruitmentApplications'],
    }),
    completeInterview: builder.mutation<void, { id: string; dto: any }>({
      query: ({ id, dto }) => serviceQuery('recruitment', `/interviews/${id}/complete`, { method: 'POST', body: dto }),
      invalidatesTags: ['RecruitmentInterviews'],
    }),
    cancelInterview: builder.mutation<void, string>({
      query: (id) => serviceQuery('recruitment', `/interviews/${id}/cancel`, { method: 'PATCH' }),
      invalidatesTags: ['RecruitmentInterviews'],
    }),

    // NEW QUERIES
    getRequisitions: builder.query<JobRequisition[], void>({
      queryFn: async () => { return { data: MOCK_REQUISITIONS }; },
      providesTags: ['RecruitmentRequisitions'],
    }),
    getWorkforceRequests: builder.query<WorkforceRequest[], void>({
      queryFn: async () => { return { data: MOCK_WORKFORCE_REQUESTS }; },
      providesTags: ['RecruitmentWorkforceRequests'],
    }),
    getOffers: builder.query<Offer[], void>({
      queryFn: async () => { return { data: MOCK_OFFERS }; },
      providesTags: ['RecruitmentOffers'],
    }),
    getCandidates: builder.query<Candidate[], void>({
      queryFn: async () => { return { data: MOCK_CANDIDATES }; },
      providesTags: ['RecruitmentCandidates'],
    }),
    getAssessments: builder.query<Assessment[], void>({
      queryFn: async () => { return { data: MOCK_ASSESSMENTS }; },
      providesTags: ['RecruitmentAssessments'],
    }),
    getTalentPool: builder.query<TalentPoolCandidate[], void>({
      queryFn: async () => { return { data: MOCK_TALENT_POOL }; },
      providesTags: ['RecruitmentTalentPool'],
    }),

    // NEW MUTATIONS
    createRequisition: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/requisitions', { method: 'POST', body }),
      invalidatesTags: ['RecruitmentRequisitions'],
    }),
    createWorkforceRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/workforce-requests', { method: 'POST', body }),
      invalidatesTags: ['RecruitmentWorkforceRequests'],
    }),
    createOffer: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/offers', { method: 'POST', body }),
      invalidatesTags: ['RecruitmentOffers'],
    }),
    publishAd: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/advertisements', { method: 'POST', body }),
    }),
    updateSettings: builder.mutation<void, any>({
      query: (body) => serviceQuery('recruitment', '/settings', { method: 'PUT', body }),
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetPipelineStatsQuery,
  useGetInterviewsQuery,
  useCreateVacancyMutation,
  usePublishVacancyMutation,
  useCloseVacancyMutation,
  useUpdateApplicationStatusMutation,
  useScheduleInterviewMutation,
  useCompleteInterviewMutation,
  useCancelInterviewMutation,
  useGetRequisitionsQuery,
  useGetWorkforceRequestsQuery,
  useGetOffersQuery,
  useGetCandidatesQuery,
  useGetAssessmentsQuery,
  useGetTalentPoolQuery,
  useCreateRequisitionMutation,
  useCreateWorkforceRequestMutation,
  useCreateOfferMutation,
  usePublishAdMutation,
  useUpdateSettingsMutation,
} = recruitmentApi;
