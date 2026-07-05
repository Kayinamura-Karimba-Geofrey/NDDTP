import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-maintenance-service',
  port: 3018,
  databaseName: 'nddtp_maintenance',
  redisDb: 17,
  queuePrefix: 'maintenance-service',
});
