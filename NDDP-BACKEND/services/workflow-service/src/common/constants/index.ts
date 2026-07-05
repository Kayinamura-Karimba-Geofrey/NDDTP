export const CACHE_KEYS = {
  DEFINITION: (id: string) => `workflow:definition:${id}`,
  DEFINITIONS: 'workflow:definitions:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  DEFINITION_CREATED: 'workflow.definition.created',
  INSTANCE_STARTED: 'workflow.instance.started',
  INSTANCE_COMPLETED: 'workflow.instance.completed',
  INSTANCE_REJECTED: 'workflow.instance.rejected',
  INSTANCE_CANCELLED: 'workflow.instance.cancelled',
  TASK_ASSIGNED: 'workflow.task.assigned',
  TASK_APPROVED: 'workflow.task.approved',
  TASK_REJECTED: 'workflow.task.rejected',
} as const;

export const INSTANCE_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['RUNNING', 'CANCELLED'],
  RUNNING: ['COMPLETED', 'REJECTED', 'CANCELLED'],
  COMPLETED: [],
  REJECTED: [],
  CANCELLED: [],
};

export const TASK_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'SKIPPED'],
  APPROVED: [],
  REJECTED: [],
  SKIPPED: [],
};

export const DEFAULT_WORKFLOW_DEFINITIONS = [
  {
    code: 'WF-LEAVE',
    name: 'Leave Approval',
    entityType: 'LEAVE',
    description: 'Standard leave request approval workflow',
    steps: [
      { stepOrder: 1, name: 'Supervisor Review', approverRole: 'SUPERVISOR', isRequired: true },
      { stepOrder: 2, name: 'HR Approval', approverRole: 'HR_MANAGER', isRequired: true },
    ],
  },
  {
    code: 'WF-EXP',
    name: 'Expenditure Approval',
    entityType: 'EXPENDITURE',
    description: 'Financial expenditure approval workflow',
    steps: [
      { stepOrder: 1, name: 'Department Head', approverRole: 'DEPARTMENT_HEAD', isRequired: true },
      { stepOrder: 2, name: 'Finance Review', approverRole: 'FINANCE_MANAGER', isRequired: true },
    ],
  },
] as const;
