export const CACHE_KEYS = {
  CONNECTOR: (id: string) => `integration:connector:${id}`,
  CONNECTORS: 'integration:connectors:active',
  ENDPOINT: (id: string) => `integration:endpoint:${id}`,
  CONNECTOR_ENDPOINTS: (connectorId: string) => `integration:connector:${connectorId}:endpoints`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CONNECTOR_CREATED: 'integration.connector.created',
  ENDPOINT_CREATED: 'integration.endpoint.created',
  JOB_SUBMITTED: 'integration.job.submitted',
  JOB_COMPLETED: 'integration.job.completed',
  JOB_FAILED: 'integration.job.failed',
} as const;

export const JOB_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['RUNNING', 'CANCELLED'],
  RUNNING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const DEFAULT_CONNECTORS = [
  { code: 'CON-HRIS', name: 'HR Information System', connectorType: 'HRIS', baseUrl: 'https://hris.internal/api' },
  { code: 'CON-ERP', name: 'Enterprise Resource Planning', connectorType: 'ERP', baseUrl: 'https://erp.internal/api' },
  { code: 'CON-FINANCE', name: 'Finance System', connectorType: 'FINANCE', baseUrl: 'https://finance.internal/api' },
] as const;
