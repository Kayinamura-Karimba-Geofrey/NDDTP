export const CACHE_KEYS = {
  POLICY: (id: string) => `backup:policy:${id}`,
  POLICIES: 'backup:policies:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  POLICY_CREATED: 'backup.policy.created',
  JOB_SUBMITTED: 'backup.job.submitted',
  JOB_COMPLETED: 'backup.job.completed',
  JOB_FAILED: 'backup.job.failed',
  RESTORE_SUBMITTED: 'backup.restore.submitted',
  RESTORE_COMPLETED: 'backup.restore.completed',
  RESTORE_FAILED: 'backup.restore.failed',
} as const;

export const JOB_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['RUNNING', 'CANCELLED'],
  RUNNING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const RESTORE_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['RUNNING', 'CANCELLED'],
  RUNNING: ['COMPLETED', 'FAILED', 'CANCELLED'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
};

export const DEFAULT_BACKUP_POLICIES = [
  { code: 'BKP-DB-DAILY', name: 'Daily Database Backup', backupType: 'FULL', targetType: 'DATABASE', schedule: '0 2 * * *', retentionDays: 30 },
  { code: 'BKP-FILES-WEEKLY', name: 'Weekly File Backup', backupType: 'INCREMENTAL', targetType: 'FILES', schedule: '0 3 * * 0', retentionDays: 90 },
  { code: 'BKP-FULL-MONTHLY', name: 'Monthly Full Backup', backupType: 'FULL', targetType: 'SYSTEM', schedule: '0 1 1 * *', retentionDays: 365 },
] as const;
