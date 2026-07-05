import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-monitoring-service',
  port: 3034,
  databaseName: 'nddtp_monitoring',
  redisDb: 33,
  queuePrefix: 'monitoring-service',
});
