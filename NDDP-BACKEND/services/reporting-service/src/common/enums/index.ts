export enum ReportType {
  PERSONNEL = 'PERSONNEL',
  FINANCE = 'FINANCE',
  OPERATIONS = 'OPERATIONS',
  LOGISTICS = 'LOGISTICS',
  AUDIT = 'AUDIT',
  CUSTOM = 'CUSTOM',
}

export enum ReportCategory {
  SUMMARY = 'SUMMARY',
  DETAIL = 'DETAIL',
  ANALYTICS = 'ANALYTICS',
  COMPLIANCE = 'COMPLIANCE',
}

export enum OutputFormat {
  PDF = 'PDF',
  CSV = 'CSV',
  JSON = 'JSON',
  XLSX = 'XLSX',
}

export enum DefinitionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum OutputStatus {
  GENERATED = 'GENERATED',
  FAILED = 'FAILED',
}

export enum ScheduleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ReportingPublishedEvent {
  DEFINITION_CREATED = 'reporting.definition.created',
  REQUEST_SUBMITTED = 'reporting.request.submitted',
  REQUEST_PROCESSING = 'reporting.request.processing',
  REQUEST_COMPLETED = 'reporting.request.completed',
  REQUEST_FAILED = 'reporting.request.failed',
  SCHEDULE_CREATED = 'reporting.schedule.created',
}
