import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_VACANCIES,
  MOCK_APPLICATIONS,
  MOCK_INTERVIEWS,
  RECRUITMENT_PIPELINE,
  type Vacancy,
  type Application,
  type Interview,
} from '../constants/recruitment-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

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
    applicationNumber: (raw.referenceNumber as string) ?? `APP-${String(raw.id).slice(0, 8)}`,
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          let items = [...MOCK_VACANCIES];
          if (params.search) {
            const q = params.search.toLowerCase();
            items = items.filter((v) => v.jobTitle.toLowerCase().includes(q) || v.department.toLowerCase().includes(q));
          }
          if (params.status) items = items.filter((v) => v.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.search) qs.set('search', params.search);
        if (params.status) qs.set('status', params.status);
        const result = await baseQuery(serviceQuery('recruitment', `/job-postings?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapVacancy) } };
      },
      providesTags: ['RecruitmentVacancies'],
    }),

    getApplications: builder.query<PaginatedResponse<Application>, { page?: number; limit?: number; status?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          let items = [...MOCK_APPLICATIONS];
          if (params.status) items = items.filter((a) => a.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.status) qs.set('status', params.status);
        const result = await baseQuery(serviceQuery('recruitment', `/applications?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapApplication) } };
      },
      providesTags: ['RecruitmentApplications'],
    }),

    getApplicationById: builder.query<Application, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          const app = MOCK_APPLICATIONS.find((a) => a.id === id);
          if (!app) return { error: { status: 404, data: { message: 'Application not found' } } };
          return { data: app };
        }
        const result = await baseQuery(serviceQuery('recruitment', `/applications/${id}`));
        if (result.error) return { error: result.error };
        return { data: mapApplication(unwrapApiResponse<Record<string, unknown>>(result.data)) };
      },
      providesTags: (_r, _e, id) => [{ type: 'RecruitmentApplications', id }],
    }),

    getPipelineStats: builder.query<{ stage: string; count: number }[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: RECRUITMENT_PIPELINE };
        }
        const result = await baseQuery(serviceQuery('recruitment', '/applications/pipeline/stats'));
        if (result.error) return { error: result.error };
        const stats = unwrapApiResponse<Record<string, number>>(result.data);
        const mapping: Record<string, string> = {
          SUBMITTED: 'Applications', SCREENING: 'Screened', SHORTLISTED: 'Shortlisted',
          INTERVIEW: 'Interviewed', OFFERED: 'Offer Sent', HIRED: 'Onboarded',
        };
        return {
          data: Object.entries(stats).map(([k, v]) => ({ stage: mapping[k] ?? k, count: v })),
        };
      },
      providesTags: ['RecruitmentPipeline'],
    }),

    getInterviews: builder.query<Interview[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_INTERVIEWS };
      },
      providesTags: ['RecruitmentInterviews'],
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetPipelineStatsQuery,
  useGetInterviewsQuery,
} = recruitmentApi;
