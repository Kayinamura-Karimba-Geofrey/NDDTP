import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-recruitment-service',
  port: 3007,
  databaseName: 'nddtp_recruitment',
  redisDb: 6,
  queuePrefix: 'recruitment-service',
});
