export const CACHE_KEYS = {
  CATEGORY: (id: string) => `maintenance:category:${id}`,
  CATEGORIES: 'maintenance:categories:active',
  WORK_ORDER: (id: string) => `maintenance:workorder:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CATEGORY_CREATED: 'maintenance.category.created',
  REQUEST_SUBMITTED: 'maintenance.request.submitted',
  REQUEST_APPROVED: 'maintenance.request.approved',
  REQUEST_REJECTED: 'maintenance.request.rejected',
  WORKORDER_CREATED: 'maintenance.workorder.created',
  WORKORDER_STARTED: 'maintenance.workorder.started',
  WORKORDER_COMPLETED: 'maintenance.workorder.completed',
  TASK_COMPLETED: 'maintenance.task.completed',
} as const;

export const REQUEST_STATUS_TRANSITIONS: Record<string, string[]> = {
  SUBMITTED: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  REJECTED: [],
  COMPLETED: [],
  CANCELLED: [],
};

export const WORK_ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SCHEDULED', 'CANCELLED'],
  SCHEDULED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const DEFAULT_CATEGORIES = [
  { code: 'MNT-PREV', name: 'Preventive Maintenance', type: 'PREVENTIVE', description: 'Scheduled preventive upkeep' },
  { code: 'MNT-CORR', name: 'Corrective Repair', type: 'CORRECTIVE', description: 'Fix identified defects' },
  { code: 'MNT-EMRG', name: 'Emergency Repair', type: 'EMERGENCY', description: 'Urgent breakdown response' },
  { code: 'MNT-INSP', name: 'Inspection Follow-up', type: 'INSPECTION', description: 'Work from failed inspections' },
] as const;
