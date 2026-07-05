import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-leave-service',
  port: 3008,
  databaseName: 'nddtp_leave',
  redisDb: 7,
  queuePrefix: 'leave-service',
});
