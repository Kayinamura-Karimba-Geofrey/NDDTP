export const CACHE_KEYS = {
  CYCLE: (id: string) => `performance:cycle:${id}`,
  ACTIVE_CYCLE: 'performance:cycle:active',
  CRITERIA: 'performance:criteria:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CYCLE_CREATED: 'performance.cycle.created',
  GOAL_CREATED: 'performance.goal.created',
  GOAL_COMPLETED: 'performance.goal.completed',
  REVIEW_SUBMITTED: 'performance.review.submitted',
  REVIEW_APPROVED: 'performance.review.approved',
  REVIEW_FINALIZED: 'performance.review.finalized',
  PLAN_CREATED: 'performance.plan.created',
  PLAN_ACTIVATED: 'performance.plan.activated',
  PLAN_COMPLETED: 'performance.plan.completed',
} as const;

export const REVIEW_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SELF_SUBMITTED'],
  SELF_SUBMITTED: ['MANAGER_REVIEW', 'REJECTED'],
  MANAGER_REVIEW: ['CALIBRATION', 'APPROVED', 'REJECTED'],
  CALIBRATION: ['APPROVED', 'REJECTED'],
  APPROVED: ['FINALIZED'],
  FINALIZED: [],
  REJECTED: ['DRAFT'],
};

export const DEFAULT_CRITERIA = [
  { code: 'LEADERSHIP', name: 'Leadership', weight: 20, description: 'Demonstrates leadership qualities and initiative' },
  { code: 'TEAMWORK', name: 'Teamwork & Collaboration', weight: 20, description: 'Works effectively with colleagues' },
  { code: 'TECHNICAL', name: 'Technical Competence', weight: 25, description: 'Demonstrates required technical skills' },
  { code: 'COMMUNICATION', name: 'Communication', weight: 15, description: 'Communicates clearly and effectively' },
  { code: 'DISCIPLINE', name: 'Discipline & Conduct', weight: 20, description: 'Upholds standards and regulations' },
] as const;
