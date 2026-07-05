export const CACHE_KEYS = {
  DATASET: (id: string) => `bi:dataset:${id}`,
  DATASETS: 'bi:datasets:active',
  MODEL: (id: string) => `bi:model:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  DATASET_CREATED: 'bi.dataset.created',
  MODEL_CREATED: 'bi.model.created',
  REPORT_CREATED: 'bi.report.created',
  EXECUTION_SUBMITTED: 'bi.execution.submitted',
  EXECUTION_PROCESSING: 'bi.execution.processing',
  EXECUTION_COMPLETED: 'bi.execution.completed',
  EXECUTION_FAILED: 'bi.execution.failed',
} as const;

export const EXECUTION_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const DEFAULT_DATASETS = [
  { code: 'DS-PER-MART', name: 'Personnel Data Mart', sourceType: 'MART' },
  { code: 'DS-FIN-MART', name: 'Finance Data Mart', sourceType: 'MART' },
  { code: 'DS-OPS-MART', name: 'Operations Data Mart', sourceType: 'MART' },
] as const;

export const DEFAULT_SEMANTIC_MODELS = [
  { code: 'MOD-PER-ANALYSIS', name: 'Personnel Analysis Model', datasetCode: 'DS-PER-MART' },
  { code: 'MOD-FIN-SUMMARY', name: 'Finance Summary Model', datasetCode: 'DS-FIN-MART' },
] as const;
