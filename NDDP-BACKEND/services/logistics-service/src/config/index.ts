import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-logistics-service',
  port: 3015,
  databaseName: 'nddtp_logistics',
  redisDb: 14,
  queuePrefix: 'logistics-service',
});
