import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-authorization-service',
  port: 3002,
  databaseName: 'nddtp_authorization',
  redisDb: 1,
  queuePrefix: 'authorization-service',
});
