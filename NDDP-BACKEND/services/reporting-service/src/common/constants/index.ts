export const CACHE_KEYS = {
  DEFINITION: (id: string) => `reporting:definition:${id}`,
  DEFINITIONS: 'reporting:definitions:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  DEFINITION_CREATED: 'reporting.definition.created',
  REQUEST_SUBMITTED: 'reporting.request.submitted',
  REQUEST_PROCESSING: 'reporting.request.processing',
  REQUEST_COMPLETED: 'reporting.request.completed',
  REQUEST_FAILED: 'reporting.request.failed',
  SCHEDULE_CREATED: 'reporting.schedule.created',
} as const;

export const REQUEST_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const DEFAULT_REPORT_DEFINITIONS = [
  { code: 'RPT-PER-SUM', name: 'Personnel Summary', reportType: 'PERSONNEL', category: 'SUMMARY', outputFormat: 'PDF' },
  { code: 'RPT-FIN-DET', name: 'Finance Detail', reportType: 'FINANCE', category: 'DETAIL', outputFormat: 'XLSX' },
  { code: 'RPT-AUD-CMP', name: 'Audit Compliance', reportType: 'AUDIT', category: 'COMPLIANCE', outputFormat: 'CSV' },
] as const;
