import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_INDIVIDUAL_OBJECTIVES,
  MOCK_REVIEWS,
  MOCK_CYCLES,
  MOCK_PIPS,
  type PerformanceGoal,
  type PerformanceReview,
  type ReviewCycle,
  type ImprovementPlan,
} from '../constants/performance-data';



function mapGoal(raw: Record<string, unknown>): PerformanceGoal {
  return {
    id: raw.id as string,
    goalNumber: raw.goalNumber as string | undefined,
    title: raw.title as string,
    description: raw.description as string | undefined,
    employee: (raw.userName as string) ?? (raw.userId as string),
    level: 'individual',
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
    reviewType: 'Annual',
    overallRating: raw.overallRating as PerformanceReview['overallRating'],
    status: (raw.status as PerformanceReview['status']) ?? 'DRAFT',
    submittedAt: raw.submittedAt as string | undefined,
  };
}

function mapCycle(raw: Record<string, unknown>): ReviewCycle {
  return {
    id: raw.id as string,
    code: raw.code as string,
    name: raw.name as string,
    type: raw.type as string,
    startDate: raw.startDate as string,
    endDate: raw.endDate as string,
    status: (raw.status as ReviewCycle['status']) ?? 'PLANNED',
  };
}

function mapPlan(raw: Record<string, unknown>): ImprovementPlan {
  return {
    id: raw.id as string,
    planNumber: (raw.planNumber as string) ?? `PIP-${String(raw.id).slice(0, 8)}`,
    employee: (raw.userName as string) ?? (raw.userId as string) ?? '—',
    supervisor: (raw.managerId as string) ?? '—',
    performanceGap: (raw.objectives as string) ?? '—',
    timeline: `${raw.startDate ?? ''} — ${raw.endDate ?? ''}`,
    status: (raw.status as ImprovementPlan['status']) ?? 'DRAFT',
  };
}

export const performanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyGoals: builder.query<PerformanceGoal[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_INDIVIDUAL_OBJECTIVES };
        }
        const result = await baseQuery(serviceQuery('performance', '/goals/me?limit=50'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapGoal) };
      },
      providesTags: ['PerformanceGoals'],
    }),

    getPerformanceReviews: builder.query<PaginatedResponse<PerformanceReview>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(250);
          return { data: paginate(MOCK_REVIEWS, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('performance', `/reviews?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapReview) } };
      },
      providesTags: ['PerformanceReviews'],
    }),

    getReviewCycles: builder.query<ReviewCycle[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_CYCLES };
        }
        const result = await baseQuery(serviceQuery('performance', '/cycles/active'));
        if (result.error) {
          const fallback = await baseQuery(serviceQuery('performance', '/cycles?limit=50'));
          if (fallback.error) return { error: fallback.error };
          const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(fallback.data);
          return { data: raw.data.map(mapCycle) };
        }
        const raw = unwrapApiResponse<Record<string, unknown>[] | Record<string, unknown>>(result.data);
        const items = Array.isArray(raw) ? raw : [raw];
        return { data: items.map(mapCycle) };
      },
      providesTags: ['PerformanceCycles'],
    }),

    getImprovementPlans: builder.query<ImprovementPlan[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_PIPS };
        }
        const result = await baseQuery(serviceQuery('performance', '/plans?limit=50'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapPlan) };
      },
      providesTags: ['PerformancePlans'],
    }),
  }),
});

export const {
  useGetMyGoalsQuery,
  useGetPerformanceReviewsQuery,
  useGetReviewCyclesQuery,
  useGetImprovementPlansQuery,
} = performanceApi;
