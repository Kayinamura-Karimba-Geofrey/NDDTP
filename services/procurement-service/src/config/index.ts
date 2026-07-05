import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-procurement-service',
  port: 3016,
  databaseName: 'nddtp_procurement',
  redisDb: 15,
  queuePrefix: 'procurement-service',
});
