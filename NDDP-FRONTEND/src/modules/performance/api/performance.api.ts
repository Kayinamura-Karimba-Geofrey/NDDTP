import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from '@/utils/api-mock';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_INDIVIDUAL_OBJECTIVES,
  MOCK_REVIEWS,
  MOCK_CYCLES,
  MOCK_PIPS,
  MOCK_ORG_GOALS,
  MOCK_DEPT_GOALS,
  MOCK_KPIS,
  MOCK_COMPETENCIES,
  MOCK_FEEDBACK,
  MOCK_RECOGNITION,
  MOCK_IDPS,
  MOCK_COACHING,
  MOCK_APPROVALS,
  MOCK_HISTORY,
  type PerformanceGoal,
  type PerformanceReview,
  type ReviewCycle,
  type ImprovementPlan,
  type KpiRecord,
  type CompetencyRating,
  type FeedbackRecord,
  type RecognitionAward,
  type DevelopmentPlan,
  type CoachingSession,
  type PerformanceApproval,
} from '../constants/performance-data';

/* ─── Mappers ────────────────────────────────────────────────────────────── */

function mapGoal(raw: Record<string, unknown>): PerformanceGoal {
  return {
    id: raw.id as string,
    goalNumber: raw.goalNumber as string | undefined,
    title: raw.title as string,
    description: raw.description as string | undefined,
    employee: (raw.userName as string) ?? (raw.userId as string),
    level: (raw.level as PerformanceGoal['level']) ?? 'individual',
    targetDate: raw.targetDate as string | undefined,
    dueDate: raw.targetDate as string | undefined,
    progressPercent: (raw.progressPercent as number) ?? 0,
    status: (raw.status as PerformanceGoal['status']) ?? 'ACTIVE',
  };
}

function mapReview(raw: Record<string, unknown>): PerformanceReview {
  const cycle = raw.cycle as { name?: string } | undefined;
  return {
    id: raw.id as string,
    reviewNumber: (raw.reviewNumber as string) ?? `REV-${String(raw.id).slice(0, 8)}`,
    employee: (raw.userName as string) ?? (raw.userId as string) ?? '—',
    reviewer: raw.reviewerId as string | undefined,
    cycle: cycle?.name ?? '—',
    reviewType: (raw.reviewType as string) ?? 'Annual',
    overallRating: raw.overallRating as PerformanceReview['overallRating'],
    status: (raw.status as PerformanceReview['status']) ?? 'DRAFT',
    submittedAt: raw.submittedAt as string | undefined,
  };
}

function mapCycle(raw: Record<string, unknown>): ReviewCycle {
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    type: (raw.type as string) ?? '—',
    startDate: (raw.startDate as string) ?? '—',
    endDate: (raw.endDate as string) ?? '—',
    status: (raw.status as ReviewCycle['status']) ?? 'PLANNED',
  };
}

/* ─── API ────────────────────────────────────────────────────────────────── */

export const performanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── QUERIES ──────────────────────────────────────────────────────────
    getMyGoals: builder.query<PerformanceGoal[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/goals/me?limit=50'));
        if (result.error) return { data: MOCK_INDIVIDUAL_OBJECTIVES };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapGoal) };
      },
      providesTags: ['PerformanceGoals'],
    }),

    getOrgGoals: builder.query<PerformanceGoal[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/goals?level=organizational&limit=50'));
        if (result.error) return { data: MOCK_ORG_GOALS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapGoal) };
      },
      providesTags: ['PerformanceGoals'],
    }),

    getDeptGoals: builder.query<PerformanceGoal[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/goals?level=department&limit=50'));
        if (result.error) return { data: MOCK_DEPT_GOALS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapGoal) };
      },
      providesTags: ['PerformanceGoals'],
    }),

    getPerformanceReviews: builder.query<PaginatedResponse<PerformanceReview>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('performance', `/reviews?${qs}`));
        if (result.error) return { data: paginate(MOCK_REVIEWS, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapReview) } };
      },
      providesTags: ['PerformanceReviews'],
    }),

    getReviewCycles: builder.query<ReviewCycle[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/cycles/active'));
        if (result.error) return { data: MOCK_CYCLES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | Record<string, unknown>>(result.data);
        const items = Array.isArray(raw) ? raw : [raw];
        return { data: items.map(mapCycle) };
      },
      providesTags: ['PerformanceCycles'],
    }),

    getImprovementPlans: builder.query<ImprovementPlan[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/plans?limit=50'));
        if (result.error) return { data: MOCK_PIPS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data as unknown as ImprovementPlan[] };
      },
      providesTags: ['PerformancePlans'],
    }),

    getKpis: builder.query<KpiRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/kpis'));
        if (result.error) return { data: MOCK_KPIS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as KpiRecord[] };
      },
      providesTags: ['PerformanceKpis'],
    }),

    getCompetencyRatings: builder.query<CompetencyRating[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/competencies/my-ratings'));
        if (result.error) return { data: MOCK_COMPETENCIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as CompetencyRating[] };
      },
      providesTags: ['PerformanceCompetencies'],
    }),

    getFeedback: builder.query<FeedbackRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/feedback'));
        if (result.error) return { data: MOCK_FEEDBACK };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FeedbackRecord[] };
      },
      providesTags: ['PerformanceFeedback'],
    }),

    getRecognitionAwards: builder.query<RecognitionAward[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/recognition'));
        if (result.error) return { data: MOCK_RECOGNITION };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as RecognitionAward[] };
      },
      providesTags: ['PerformanceRecognition'],
    }),

    getDevelopmentPlans: builder.query<DevelopmentPlan[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/development-plans'));
        if (result.error) return { data: MOCK_IDPS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as DevelopmentPlan[] };
      },
      providesTags: ['PerformanceDevelopmentPlans'],
    }),

    getCoachingSessions: builder.query<CoachingSession[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/coaching-sessions'));
        if (result.error) return { data: MOCK_COACHING };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as CoachingSession[] };
      },
      providesTags: ['PerformanceCoaching'],
    }),

    getPendingPerformanceApprovals: builder.query<PerformanceApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/approvals/pending'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PerformanceApproval[] };
      },
      providesTags: ['PerformanceApprovals'],
    }),

    getPerformanceHistory: builder.query<typeof MOCK_HISTORY, void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('performance', '/history'));
        if (result.error) return { data: MOCK_HISTORY };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as typeof MOCK_HISTORY };
      },
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createGoal: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/goals', { method: 'POST', body }),
      invalidatesTags: ['PerformanceGoals'],
    }),

    updateGoalProgress: builder.mutation<void, { id: string; progressPercent: number }>({
      query: ({ id, ...body }) => serviceQuery('performance', `/goals/${id}/progress`, { method: 'PATCH', body }),
      invalidatesTags: ['PerformanceGoals'],
    }),

    startReview: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/reviews', { method: 'POST', body }),
      invalidatesTags: ['PerformanceReviews'],
    }),

    actionPerformanceApproval: builder.mutation<void, { id: string; action: 'APPROVED' | 'REJECTED'; comments?: string }>({
      query: ({ id, action, comments }) => serviceQuery('performance', `/approvals/${id}/action`, { method: 'POST', body: { action, comments } }),
      invalidatesTags: ['PerformanceApprovals', 'PerformanceReviews'],
    }),

    createReviewCycle: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/cycles', { method: 'POST', body }),
      invalidatesTags: ['PerformanceCycles'],
    }),

    createImprovementPlan: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/plans', { method: 'POST', body }),
      invalidatesTags: ['PerformancePlans'],
    }),

    nominateForAward: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/recognition', { method: 'POST', body }),
      invalidatesTags: ['PerformanceRecognition'],
    }),

    giveFeedback: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/feedback', { method: 'POST', body }),
      invalidatesTags: ['PerformanceFeedback'],
    }),

    createDevelopmentPlan: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/development-plans', { method: 'POST', body }),
      invalidatesTags: ['PerformanceDevelopmentPlans'],
    }),

    scheduleCoachingSession: builder.mutation<void, any>({
      query: (body) => serviceQuery('performance', '/coaching-sessions', { method: 'POST', body }),
      invalidatesTags: ['PerformanceCoaching'],
    }),
  }),
});

export const {
  useGetMyGoalsQuery,
  useGetOrgGoalsQuery,
  useGetDeptGoalsQuery,
  useGetPerformanceReviewsQuery,
  useGetReviewCyclesQuery,
  useGetImprovementPlansQuery,
  useGetKpisQuery,
  useGetCompetencyRatingsQuery,
  useGetFeedbackQuery,
  useGetRecognitionAwardsQuery,
  useGetDevelopmentPlansQuery,
  useGetCoachingSessionsQuery,
  useGetPendingPerformanceApprovalsQuery,
  useGetPerformanceHistoryQuery,
  useCreateGoalMutation,
  useUpdateGoalProgressMutation,
  useStartReviewMutation,
  useActionPerformanceApprovalMutation,
  useCreateReviewCycleMutation,
  useCreateImprovementPlanMutation,
  useNominateForAwardMutation,
  useGiveFeedbackMutation,
  useCreateDevelopmentPlanMutation,
  useScheduleCoachingSessionMutation,
} = performanceApi;
