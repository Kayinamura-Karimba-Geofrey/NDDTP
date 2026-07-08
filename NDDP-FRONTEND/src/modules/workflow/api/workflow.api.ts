import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_TEMPLATES,
  MOCK_RUNNING,
  MOCK_TASKS,
  type WorkflowTemplate,
  type RunningWorkflow,
  type WorkflowTask,
} from '../constants/workflow-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function mapTemplate(raw: Record<string, unknown>): WorkflowTemplate {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? (raw.code as string) ?? '—',
    description: (raw.description as string) ?? '—',
    category: (raw.category as string) ?? (raw.module as string) ?? 'General',
    version: (raw.version as string) ?? `v${raw.versionNumber ?? 1}`,
    status: ((raw.isActive ?? raw.status) ? 'ACTIVE' : 'INACTIVE') as WorkflowTemplate['status'],
    createdBy: (raw.createdBy as string) ?? '—',
    lastModified: (raw.updatedAt as string) ?? (raw.createdAt as string) ?? '',
    service: raw.service as string | undefined,
  };
}

function mapInstance(raw: Record<string, unknown>): RunningWorkflow {
  const def = raw.definition as { name?: string } | undefined;
  return {
    id: raw.id as string,
    workflowId: (raw.referenceNumber as string) ?? `WF-${String(raw.id).slice(0, 8)}`,
    template: def?.name ?? (raw.templateName as string) ?? '—',
    currentStage: (raw.currentStepName as string) ?? (raw.status as string) ?? '—',
    owner: (raw.initiatorName as string) ?? (raw.userId as string) ?? '—',
    started: (raw.startedAt as string) ?? (raw.createdAt as string) ?? '',
    dueDate: raw.dueAt as string | undefined,
    status: (raw.status as RunningWorkflow['status']) ?? 'RUNNING',
    service: (raw.module as string) ?? '—',
  };
}

function mapTask(raw: Record<string, unknown>): WorkflowTask {
  const instance = raw.instance as { referenceNumber?: string; definition?: { name?: string } } | undefined;
  return {
    id: raw.id as string,
    taskName: (raw.title as string) ?? (raw.stepName as string) ?? 'Approval Task',
    assignedTo: (raw.assigneeName as string) ?? (raw.approverRole as string) ?? '—',
    priority: (raw.priority as string) ?? 'Normal',
    dueDate: (raw.dueAt as string) ?? '',
    slaStatus: (raw.slaStatus as string) ?? 'On Track',
    workflow: instance?.definition?.name ?? '—',
    workflowId: instance?.referenceNumber ?? '—',
    status: (raw.status as WorkflowTask['status']) ?? 'PENDING',
  };
}

export const workflowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowTemplates: builder.query<WorkflowTemplate[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_TEMPLATES };
        }
        const result = await baseQuery(serviceQuery('workflow', '/definitions'));
        if (result.error) return { data: MOCK_TEMPLATES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapTemplate) };
      },
      providesTags: ['WorkflowTemplates'],
    }),

    getRunningWorkflows: builder.query<PaginatedResponse<RunningWorkflow>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: paginate(MOCK_RUNNING, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('workflow', `/instances?${qs}`));
        if (result.error) return { data: paginate(MOCK_RUNNING, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapInstance) } };
      },
      providesTags: ['WorkflowInstances'],
    }),

    getPendingTasks: builder.query<WorkflowTask[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_TASKS };
        }
        const result = await baseQuery(serviceQuery('workflow', '/tasks/me?limit=50'));
        if (result.error) {
          const fallback = await baseQuery(serviceQuery('workflow', '/tasks/pending?limit=50'));
          if (fallback.error) return { data: MOCK_TASKS };
          const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(fallback.data);
          return { data: raw.data.map(mapTask) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: raw.data.map(mapTask) };
      },
      providesTags: ['WorkflowTasks'],
    }),
  }),
});

export const {
  useGetWorkflowTemplatesQuery,
  useGetRunningWorkflowsQuery,
  useGetPendingTasksQuery,
} = workflowApi;
