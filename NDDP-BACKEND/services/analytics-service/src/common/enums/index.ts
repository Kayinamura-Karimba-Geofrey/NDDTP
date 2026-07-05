export enum MetricDomain {
  PERSONNEL = 'PERSONNEL',
  FINANCE = 'FINANCE',
  OPERATIONS = 'OPERATIONS',
  LOGISTICS = 'LOGISTICS',
  READINESS = 'READINESS',
  CUSTOM = 'CUSTOM',
}

export enum AggregationType {
  SUM = 'SUM',
  AVG = 'AVG',
  COUNT = 'COUNT',
  MIN = 'MIN',
  MAX = 'MAX',
  RATE = 'RATE',
}

export enum MetricStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum DashboardStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ChartType {
  LINE = 'LINE',
  BAR = 'BAR',
  PIE = 'PIE',
  KPI_CARD = 'KPI_CARD',
  TABLE = 'TABLE',
}

export enum QueryStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum AnalyticsPublishedEvent {
  METRIC_CREATED = 'analytics.metric.created',
  SNAPSHOT_RECORDED = 'analytics.snapshot.recorded',
  DASHBOARD_CREATED = 'analytics.dashboard.created',
  QUERY_SUBMITTED = 'analytics.query.submitted',
  QUERY_PROCESSING = 'analytics.query.processing',
  QUERY_COMPLETED = 'analytics.query.completed',
  QUERY_FAILED = 'analytics.query.failed',
}
