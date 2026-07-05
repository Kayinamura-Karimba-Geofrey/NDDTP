export enum DataSourceType {
  WAREHOUSE = 'WAREHOUSE',
  MART = 'MART',
  EXTERNAL = 'EXTERNAL',
  CUSTOM = 'CUSTOM',
}

export enum DatasetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ModelStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum BiReportType {
  TABULAR = 'TABULAR',
  PIVOT = 'PIVOT',
  CHART = 'CHART',
  COMBINED = 'COMBINED',
}

export enum ReportDefinitionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ExecutionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum BiPublishedEvent {
  DATASET_CREATED = 'bi.dataset.created',
  MODEL_CREATED = 'bi.model.created',
  REPORT_CREATED = 'bi.report.created',
  EXECUTION_SUBMITTED = 'bi.execution.submitted',
  EXECUTION_PROCESSING = 'bi.execution.processing',
  EXECUTION_COMPLETED = 'bi.execution.completed',
  EXECUTION_FAILED = 'bi.execution.failed',
}
