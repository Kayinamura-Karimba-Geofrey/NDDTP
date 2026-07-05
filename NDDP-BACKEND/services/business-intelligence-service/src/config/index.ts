import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-business-intelligence-service',
  port: 3026,
  databaseName: 'nddtp_business_intelligence',
  redisDb: 25,
  queuePrefix: 'business-intelligence-service',
});
