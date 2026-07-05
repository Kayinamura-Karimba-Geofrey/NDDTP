import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-backup-service',
  port: 3033,
  databaseName: 'nddtp_backup',
  redisDb: 32,
  queuePrefix: 'backup-service',
});
