import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-personnel-service',
  port: 3006,
  databaseName: 'nddtp_personnel',
  redisDb: 5,
  queuePrefix: 'personnel-service',
});
