import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-audit-service',
  port: 3005,
  databaseName: 'nddtp_audit',
  redisDb: 4,
  queuePrefix: 'audit-service',
});
