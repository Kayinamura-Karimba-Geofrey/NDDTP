import { baseApi, serviceQuery } from '@/services/api/base-api';
import { paginate } from '@/utils/api-mock';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_COURSES,
  MOCK_ENROLLMENTS,
  MOCK_CERTIFICATIONS,
  MOCK_APPROVALS,
  MOCK_PROGRAMS,
  MOCK_LEARNING_PATHS,
  MOCK_INSTRUCTORS,
  MOCK_CLASSROOMS,
  MOCK_ASSESSMENTS,
  MOCK_EXAMINATIONS,
  MOCK_ATTENDANCE,
  MOCK_MATERIALS,
  MOCK_COMPETENCIES,
  MOCK_TRAINING_REQUESTS,
  MOCK_TRAINING_HISTORY,
  type TrainingCourse,
  type Enrollment,
  type Certification,
  type TrainingApproval,
  type TrainingProgram,
  type LearningPath,
  type Instructor,
  type Classroom,
  type TrainingAssessment,
  type Examination,
  type AttendanceRecord,
  type LearningMaterial,
  type Competency,
  type TrainingRequest,
  type TrainingHistoryEntry,
} from '../constants/training-data';

/* ─── Mappers ────────────────────────────────────────────────────────────── */

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
    progress: (raw.progress as number) ?? 0,
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

/* ─── API ────────────────────────────────────────────────────────────────── */

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── QUERIES ──────────────────────────────────────────────────────────
    getTrainingCourses: builder.query<TrainingCourse[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/courses/active'));
        if (result.error) return { data: MOCK_COURSES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCourse) };
      },
      providesTags: ['TrainingCourses'],
    }),

    getEnrollments: builder.query<PaginatedResponse<Enrollment>, { page?: number; limit?: number; mine?: boolean }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const path = params.mine ? '/enrollments/me' : '/enrollments';
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        const result = await baseQuery(serviceQuery('training', `${path}?${qs}`));
        if (result.error) return { data: paginate(MOCK_ENROLLMENTS, params.page ?? 1, params.limit ?? 20) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapEnrollment) } };
      },
      providesTags: ['TrainingEnrollments'],
    }),

    getCertifications: builder.query<Certification[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/certifications'));
        if (result.error) return { data: MOCK_CERTIFICATIONS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return { data: list.map(mapCertification) };
      },
      providesTags: ['TrainingCertifications'],
    }),

    getPendingTrainingApprovals: builder.query<TrainingApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/enrollments/pending-review'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapApproval) };
      },
      providesTags: ['TrainingApprovals'],
    }),

    getTrainingPrograms: builder.query<TrainingProgram[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/programs'));
        if (result.error) return { data: MOCK_PROGRAMS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TrainingProgram[] };
      },
      providesTags: ['TrainingPrograms'],
    }),

    getLearningPaths: builder.query<LearningPath[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/learning-paths'));
        if (result.error) return { data: MOCK_LEARNING_PATHS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as LearningPath[] };
      },
      providesTags: ['TrainingLearningPaths'],
    }),

    getInstructors: builder.query<Instructor[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/instructors'));
        if (result.error) return { data: MOCK_INSTRUCTORS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Instructor[] };
      },
      providesTags: ['TrainingInstructors'],
    }),

    getClassrooms: builder.query<Classroom[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/classrooms'));
        if (result.error) return { data: MOCK_CLASSROOMS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Classroom[] };
      },
      providesTags: ['TrainingClassrooms'],
    }),

    getTrainingAssessments: builder.query<TrainingAssessment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/assessments'));
        if (result.error) return { data: MOCK_ASSESSMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TrainingAssessment[] };
      },
      providesTags: ['TrainingAssessments'],
    }),

    getExaminations: builder.query<Examination[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/examinations'));
        if (result.error) return { data: MOCK_EXAMINATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Examination[] };
      },
      providesTags: ['TrainingExaminations'],
    }),

    getAttendance: builder.query<AttendanceRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/attendance'));
        if (result.error) return { data: MOCK_ATTENDANCE };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AttendanceRecord[] };
      },
      providesTags: ['TrainingAttendance'],
    }),

    getLearningMaterials: builder.query<LearningMaterial[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/materials'));
        if (result.error) return { data: MOCK_MATERIALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as LearningMaterial[] };
      },
      providesTags: ['TrainingMaterials'],
    }),

    getCompetencies: builder.query<Competency[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/competencies'));
        if (result.error) return { data: MOCK_COMPETENCIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Competency[] };
      },
      providesTags: ['TrainingCompetencies'],
    }),

    getTrainingRequests: builder.query<TrainingRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/training-requests'));
        if (result.error) return { data: MOCK_TRAINING_REQUESTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TrainingRequest[] };
      },
      providesTags: ['TrainingRequests'],
    }),

    getTrainingHistory: builder.query<TrainingHistoryEntry[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('training', '/history'));
        if (result.error) return { data: MOCK_TRAINING_HISTORY };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TrainingHistoryEntry[] };
      },
      providesTags: ['TrainingHistory'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createCourse: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/courses', { method: 'POST', body }),
      invalidatesTags: ['TrainingCourses'],
    }),

    enrollInCourse: builder.mutation<void, { courseId: string; reason?: string }>({
      query: (body) => serviceQuery('training', '/enrollments', { method: 'POST', body }),
      invalidatesTags: ['TrainingEnrollments', 'TrainingCourses'],
    }),

    actionTrainingApproval: builder.mutation<void, { id: string; action: 'APPROVED' | 'REJECTED' | 'RETURNED'; comments?: string }>({
      query: ({ id, action, comments }) => serviceQuery('training', `/enrollments/${id}/review`, { method: 'POST', body: { action, comments } }),
      invalidatesTags: ['TrainingApprovals', 'TrainingEnrollments'],
    }),

    submitTrainingRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/training-requests', { method: 'POST', body }),
      invalidatesTags: ['TrainingRequests'],
    }),

    createProgram: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/programs', { method: 'POST', body }),
      invalidatesTags: ['TrainingPrograms'],
    }),

    createLearningPath: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/learning-paths', { method: 'POST', body }),
      invalidatesTags: ['TrainingLearningPaths'],
    }),

    enrollInLearningPath: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('training', `/learning-paths/${id}/enroll`, { method: 'POST', body: {} }),
      invalidatesTags: ['TrainingEnrollments'],
    }),

    scheduleExamination: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/examinations', { method: 'POST', body }),
      invalidatesTags: ['TrainingExaminations'],
    }),

    createAssessment: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/assessments', { method: 'POST', body }),
      invalidatesTags: ['TrainingAssessments'],
    }),

    addInstructor: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/instructors', { method: 'POST', body }),
      invalidatesTags: ['TrainingInstructors'],
    }),

    addClassroom: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/classrooms', { method: 'POST', body }),
      invalidatesTags: ['TrainingClassrooms'],
    }),

    uploadMaterial: builder.mutation<void, any>({
      query: (body) => serviceQuery('training', '/materials', { method: 'POST', body }),
      invalidatesTags: ['TrainingMaterials'],
    }),
  }),
});

export const {
  useGetTrainingCoursesQuery,
  useGetEnrollmentsQuery,
  useGetCertificationsQuery,
  useGetPendingTrainingApprovalsQuery,
  useGetTrainingProgramsQuery,
  useGetLearningPathsQuery,
  useGetInstructorsQuery,
  useGetClassroomsQuery,
  useGetTrainingAssessmentsQuery,
  useGetExaminationsQuery,
  useGetAttendanceQuery,
  useGetLearningMaterialsQuery,
  useGetCompetenciesQuery,
  useGetTrainingRequestsQuery,
  useGetTrainingHistoryQuery,
  useCreateCourseMutation,
  useEnrollInCourseMutation,
  useActionTrainingApprovalMutation,
  useSubmitTrainingRequestMutation,
  useCreateProgramMutation,
  useCreateLearningPathMutation,
  useEnrollInLearningPathMutation,
  useScheduleExaminationMutation,
  useCreateAssessmentMutation,
  useAddInstructorMutation,
  useAddClassroomMutation,
  useUploadMaterialMutation,
} = trainingApi;
