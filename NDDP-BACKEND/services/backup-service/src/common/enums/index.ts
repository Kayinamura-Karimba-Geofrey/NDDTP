export enum BackupType {
  FULL = 'FULL',
  INCREMENTAL = 'INCREMENTAL',
  DIFFERENTIAL = 'DIFFERENTIAL',
}

export enum TargetType {
  DATABASE = 'DATABASE',
  FILES = 'FILES',
  SYSTEM = 'SYSTEM',
}

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum RestoreStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum BackupPublishedEvent {
  POLICY_CREATED = 'backup.policy.created',
  JOB_SUBMITTED = 'backup.job.submitted',
  JOB_COMPLETED = 'backup.job.completed',
  JOB_FAILED = 'backup.job.failed',
  RESTORE_SUBMITTED = 'backup.restore.submitted',
  RESTORE_COMPLETED = 'backup.restore.completed',
  RESTORE_FAILED = 'backup.restore.failed',
}
