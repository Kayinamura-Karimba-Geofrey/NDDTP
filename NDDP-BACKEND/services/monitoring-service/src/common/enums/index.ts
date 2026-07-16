export enum TargetType {
  SERVICE = 'SERVICE',
  DATABASE = 'DATABASE',
  ENDPOINT = 'ENDPOINT',
}

export enum TargetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CheckStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  OPEN = 'OPEN',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum MonitoringPublishedEvent {
  TARGET_CREATED = 'monitoring.target.created',
  CHECK_SUBMITTED = 'monitoring.check.submitted',
  CHECK_PASSED = 'monitoring.check.passed',
  CHECK_FAILED = 'monitoring.check.failed',
  ALERT_RAISED = 'monitoring.alert.raised',
  ALERT_ACKNOWLEDGED = 'monitoring.alert.acknowledged',
  ALERT_RESOLVED = 'monitoring.alert.resolved',
}
