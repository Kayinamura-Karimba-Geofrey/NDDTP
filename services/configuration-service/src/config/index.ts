import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-configuration-service',
  port: 3030,
  databaseName: 'nddtp_configuration',
  redisDb: 29,
  queuePrefix: 'configuration-service',
});
