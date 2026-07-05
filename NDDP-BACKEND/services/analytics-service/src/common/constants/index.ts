export const CACHE_KEYS = {
  METRIC: (id: string) => `analytics:metric:${id}`,
  METRICS: 'analytics:metrics:active',
  DASHBOARD: (id: string) => `analytics:dashboard:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  METRIC_CREATED: 'analytics.metric.created',
  SNAPSHOT_RECORDED: 'analytics.snapshot.recorded',
  DASHBOARD_CREATED: 'analytics.dashboard.created',
  QUERY_SUBMITTED: 'analytics.query.submitted',
  QUERY_PROCESSING: 'analytics.query.processing',
  QUERY_COMPLETED: 'analytics.query.completed',
  QUERY_FAILED: 'analytics.query.failed',
} as const;

export const QUERY_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const DEFAULT_METRIC_DEFINITIONS = [
  { code: 'MET-PER-HEADCOUNT', name: 'Personnel Headcount', domain: 'PERSONNEL', aggregationType: 'COUNT', unit: 'persons' },
  { code: 'MET-FIN-BUDGET', name: 'Budget Utilization Rate', domain: 'FINANCE', aggregationType: 'RATE', unit: 'percent' },
  { code: 'MET-OPS-READINESS', name: 'Operational Readiness Index', domain: 'READINESS', aggregationType: 'AVG', unit: 'index' },
] as const;
