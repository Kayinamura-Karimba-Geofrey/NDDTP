import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_COURSES,
  MOCK_ENROLLMENTS,
  MOCK_CERTIFICATIONS,
  MOCK_APPROVALS,
  type TrainingCourse,
  type Enrollment,
  type Certification,
  type TrainingApproval,
} from '../constants/training-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function mapCourse(raw: Record<string, unknown>): TrainingCourse {
  const durationDays = (raw.durationDays as number) ?? 1;
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    title: (raw.name as string) ?? (raw.title as string) ?? '—',
    category: (raw.category as string) ?? 'General',
    instructor: (raw.instructorName as string) ?? (raw.instructor as string) ?? 'TBD',
    duration: `${durationDays} day${durationDays > 1 ? 's' : ''}`,
    deliveryMode: (raw.deliveryMode as string) ?? 'Classroom',
    capacity: (raw.maxParticipants as number) ?? 0,
    enrolled: raw.enrolledCount as number | undefined,
    status: ((raw.status as string) ?? 'ACTIVE') as TrainingCourse['status'],
    description: raw.description as string | undefined,
    passingScore: raw.passingScore as number | undefined,
  };
}

function mapEnrollment(raw: Record<string, unknown>): Enrollment {
  const session = raw.session as { course?: { name?: string } } | undefined;
  return {
    id: raw.id as string,
    personnelName: (raw.personnelName as string) ?? (raw.userName as string) ?? '—',
    course: session?.course?.name ?? (raw.courseName as string) ?? '—',
    enrollmentDate: (raw.submittedAt as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
    progress: (raw.progress as number) ?? (raw.score as number) ?? 0,
    status: (raw.status as Enrollment['status']) ?? 'PENDING',
    completionDate: raw.completedAt as string | undefined,
  };
}

function mapCertification(raw: Record<string, unknown>): Certification {
  return {
    id: raw.id as string,
    certificateNumber: (raw.certificateNumber as string) ?? `CERT-${String(raw.id).slice(0, 8)}`,
    course: (raw.courseName as string) ?? (raw.course as string) ?? '—',
    recipient: (raw.recipientName as string) ?? (raw.userName as string) ?? '—',
    issueDate: (raw.issuedAt as string) ?? (raw.issueDate as string) ?? '—',
    expiryDate: raw.expiresAt as string | undefined,
    status: ((raw.status as string) ?? 'ISSUED') as Certification['status'],
  };
}

function mapApproval(raw: Record<string, unknown>): TrainingApproval {
  return {
    id: raw.id as string,
    employeeName: (raw.personnelName as string) ?? (raw.userName as string) ?? '—',
    course: (raw.courseName as string) ?? '—',
    requestDate: (raw.submittedAt as string) ?? new Date().toISOString(),
    status: (raw.status as TrainingApproval['status']) ?? 'PENDING',
    priority: (raw.priority as string) ?? 'Medium',
  };
}

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainingCourses: builder.query<TrainingCourse[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_COURSES };
        }
        const result = await baseQuery(serviceQuery('training', '/courses/active'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCourse) };
      },
      providesTags: ['TrainingCourses'],
    }),

    getEnrollments: builder.query<PaginatedResponse<Enrollment>, { page?: number; limit?: number; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 250));
          return { data: paginate(MOCK_ENROLLMENTS, params.page ?? 1, params.limit ?? 20) };
        }
        const path = params.mine ? '/enrollments/me' : '/enrollments';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        const result = await baseQuery(serviceQuery('training', `${path}?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapEnrollment) } };
      },
      providesTags: ['TrainingEnrollments'],
    }),

    getCertifications: builder.query<Certification[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_CERTIFICATIONS };
        }
        const result = await baseQuery(serviceQuery('training', '/certifications'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapCertification) };
      },
      providesTags: ['TrainingCertifications'],
    }),

    getPendingTrainingApprovals: builder.query<TrainingApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_APPROVALS };
        }
        const result = await baseQuery(serviceQuery('training', '/enrollments/pending-review'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapApproval) };
      },
      providesTags: ['TrainingApprovals'],
    }),
  }),
});

export const {
  useGetTrainingCoursesQuery,
  useGetEnrollmentsQuery,
  useGetCertificationsQuery,
  useGetPendingTrainingApprovalsQuery,
} = trainingApi;
