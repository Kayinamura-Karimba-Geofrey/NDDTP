import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-finance-service',
  port: 3020,
  databaseName: 'nddtp_finance',
  redisDb: 19,
  queuePrefix: 'finance-service',
});
