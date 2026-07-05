import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-facilities-service',
  port: 3019,
  databaseName: 'nddtp_facilities',
  redisDb: 18,
  queuePrefix: 'facilities-service',
});
