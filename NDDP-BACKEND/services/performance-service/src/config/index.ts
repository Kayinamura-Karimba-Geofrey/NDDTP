import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-performance-service',
  port: 3012,
  databaseName: 'nddtp_performance',
  redisDb: 11,
  queuePrefix: 'performance-service',
});
