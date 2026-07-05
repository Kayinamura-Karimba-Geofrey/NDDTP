import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-integration-service',
  port: 3031,
  databaseName: 'nddtp_integration',
  redisDb: 30,
  queuePrefix: 'integration-service',
});
