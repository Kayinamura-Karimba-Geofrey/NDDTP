import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-reporting-service',
  port: 3024,
  databaseName: 'nddtp_reporting',
  redisDb: 23,
  queuePrefix: 'reporting-service',
});
