import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-visitor-service',
  port: 3021,
  databaseName: 'nddtp_visitor',
  redisDb: 20,
  queuePrefix: 'visitor-service',
});
