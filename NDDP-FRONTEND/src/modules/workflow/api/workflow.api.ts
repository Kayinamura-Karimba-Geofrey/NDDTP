import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_TEMPLATES,
  MOCK_RUNNING,
  MOCK_TASKS,
  MOCK_CHAINS,
  MOCK_RULES,
  MOCK_DELEGATIONS,
  MOCK_ESCALATIONS,
  MOCK_SLAS,
  MOCK_AUTOMATION,
  MOCK_HISTORY,
  type WorkflowTemplate,
  type RunningWorkflow,
  type WorkflowTask,
  type ApprovalChain,
  type BusinessRule,
  type Delegation,
  type EscalationRule,
  type SlaRule,
  type AutomationRule,
  type WorkflowHistoryEvent,
} from '../constants/workflow-data';

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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getWorkflowTemplates: builder.query<WorkflowTemplate[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
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

    getApprovalChains: builder.query<ApprovalChain[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/approval-chains'));
        if (result.error) return { data: MOCK_CHAINS };
        const raw = unwrapApiResponse<ApprovalChain[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowChains'],
    }),

    getBusinessRules: builder.query<BusinessRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/business-rules'));
        if (result.error) return { data: MOCK_RULES };
        const raw = unwrapApiResponse<BusinessRule[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowRules'],
    }),

    getDelegations: builder.query<Delegation[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/delegations'));
        if (result.error) return { data: MOCK_DELEGATIONS };
        const raw = unwrapApiResponse<Delegation[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowDelegations'],
    }),

    getEscalationRules: builder.query<EscalationRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/escalations'));
        if (result.error) return { data: MOCK_ESCALATIONS };
        const raw = unwrapApiResponse<EscalationRule[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowEscalations'],
    }),

    getSlaRules: builder.query<SlaRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/sla-rules'));
        if (result.error) return { data: MOCK_SLAS };
        const raw = unwrapApiResponse<SlaRule[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowSla'],
    }),

    getAutomationRules: builder.query<AutomationRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/automations'));
        if (result.error) return { data: MOCK_AUTOMATION };
        const raw = unwrapApiResponse<AutomationRule[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowAutomation'],
    }),

    getWorkflowHistory: builder.query<WorkflowHistoryEvent[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('workflow', '/history'));
        if (result.error) return { data: MOCK_HISTORY };
        const raw = unwrapApiResponse<WorkflowHistoryEvent[]>(result.data);
        return { data: raw };
      },
      providesTags: ['WorkflowHistory'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createWorkflowTemplate: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/definitions', { method: 'POST', body }),
      invalidatesTags: ['WorkflowTemplates'],
    }),

    startWorkflowInstance: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/instances', { method: 'POST', body }),
      invalidatesTags: ['WorkflowInstances'],
    }),

    processTaskApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' | 'DELEGATE'; details?: any }>({
      query: ({ id, action, details }) => serviceQuery('workflow', `/tasks/${id}/action`, { method: 'POST', body: { action, ...details } }),
      invalidatesTags: ['WorkflowTasks', 'WorkflowInstances', 'WorkflowHistory'],
    }),

    createApprovalChain: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/approval-chains', { method: 'POST', body }),
      invalidatesTags: ['WorkflowChains'],
    }),

    createBusinessRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/business-rules', { method: 'POST', body }),
      invalidatesTags: ['WorkflowRules'],
    }),

    createDelegation: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/delegations', { method: 'POST', body }),
      invalidatesTags: ['WorkflowDelegations'],
    }),

    createEscalationRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/escalations', { method: 'POST', body }),
      invalidatesTags: ['WorkflowEscalations'],
    }),

    createSlaRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/sla-rules', { method: 'POST', body }),
      invalidatesTags: ['WorkflowSla'],
    }),

    createAutomationRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('workflow', '/automations', { method: 'POST', body }),
      invalidatesTags: ['WorkflowAutomation'],
    }),
  }),
});

export const {
  useGetWorkflowTemplatesQuery,
  useGetRunningWorkflowsQuery,
  useGetPendingTasksQuery,
  useGetApprovalChainsQuery,
  useGetBusinessRulesQuery,
  useGetDelegationsQuery,
  useGetEscalationRulesQuery,
  useGetSlaRulesQuery,
  useGetAutomationRulesQuery,
  useGetWorkflowHistoryQuery,
  useCreateWorkflowTemplateMutation,
  useStartWorkflowInstanceMutation,
  useProcessTaskApprovalMutation,
  useCreateApprovalChainMutation,
  useCreateBusinessRuleMutation,
  useCreateDelegationMutation,
  useCreateEscalationRuleMutation,
  useCreateSlaRuleMutation,
  useCreateAutomationRuleMutation,
} = workflowApi;
