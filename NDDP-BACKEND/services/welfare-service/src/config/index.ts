import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-welfare-service',
  port: 3009,
  databaseName: 'nddtp_welfare',
  redisDb: 8,
  queuePrefix: 'welfare-service',
});
