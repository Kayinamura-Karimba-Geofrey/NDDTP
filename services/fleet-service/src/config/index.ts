import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-fleet-service',
  port: 3017,
  databaseName: 'nddtp_fleet',
  redisDb: 16,
  queuePrefix: 'fleet-service',
});
