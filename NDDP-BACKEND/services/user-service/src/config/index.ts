import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-user-service',
  port: 3003,
  databaseName: 'nddtp_user',
  redisDb: 2,
  queuePrefix: 'user-service',
});
