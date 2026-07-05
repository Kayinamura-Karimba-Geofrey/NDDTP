import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-training-service',
  port: 3011,
  databaseName: 'nddtp_training',
  redisDb: 10,
  queuePrefix: 'training-service',
});
