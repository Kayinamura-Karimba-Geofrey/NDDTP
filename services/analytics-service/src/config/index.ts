import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-analytics-service',
  port: 3025,
  databaseName: 'nddtp_analytics',
  redisDb: 24,
  queuePrefix: 'analytics-service',
});
