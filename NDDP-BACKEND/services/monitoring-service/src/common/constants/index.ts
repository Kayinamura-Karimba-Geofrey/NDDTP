export const CACHE_KEYS = {
  TARGET: (id: string) => `monitoring:target:${id}`,
  TARGETS: 'monitoring:targets:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  TARGET_CREATED: 'monitoring.target.created',
  CHECK_SUBMITTED: 'monitoring.check.submitted',
  CHECK_PASSED: 'monitoring.check.passed',
  CHECK_FAILED: 'monitoring.check.failed',
  ALERT_RAISED: 'monitoring.alert.raised',
  ALERT_ACKNOWLEDGED: 'monitoring.alert.acknowledged',
  ALERT_RESOLVED: 'monitoring.alert.resolved',
} as const;

export const CHECK_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['RUNNING', 'CANCELLED'],
  RUNNING: ['PASSED', 'FAILED', 'CANCELLED'],
  PASSED: [],
  FAILED: [],
  CANCELLED: [],
};

export const ALERT_STATUS_TRANSITIONS: Record<string, string[]> = {
  OPEN: ['ACKNOWLEDGED', 'CLOSED'],
  ACKNOWLEDGED: ['RESOLVED', 'CLOSED'],
  RESOLVED: [],
  CLOSED: [],
};

export const DEFAULT_MONITORING_TARGETS = [
  { code: 'TGT-AUTH-SVC', name: 'Auth Service', targetType: 'SERVICE', endpointUrl: 'http://auth-service:3001/api/v1/health', checkIntervalSeconds: 60 },
  { code: 'TGT-API-GW', name: 'API Gateway', targetType: 'ENDPOINT', endpointUrl: 'http://api-gateway:3000/health', checkIntervalSeconds: 30 },
  { code: 'TGT-DB-PRIMARY', name: 'Primary Database', targetType: 'DATABASE', endpointUrl: 'postgres://primary-db:5432', checkIntervalSeconds: 120 },
] as const;
