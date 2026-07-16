export enum ConnectorType {
  HRIS = 'HRIS',
  ERP = 'ERP',
  FINANCE = 'FINANCE',
  CUSTOM = 'CUSTOM',
}

export enum ConnectorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EndpointStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum IntegrationPublishedEvent {
  CONNECTOR_CREATED = 'integration.connector.created',
  ENDPOINT_CREATED = 'integration.endpoint.created',
  JOB_SUBMITTED = 'integration.job.submitted',
  JOB_COMPLETED = 'integration.job.completed',
  JOB_FAILED = 'integration.job.failed',
}
