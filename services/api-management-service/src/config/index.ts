import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-api-management-service',
  port: 3032,
  databaseName: 'nddtp_api_management',
  redisDb: 31,
  queuePrefix: 'api-management-service',
});
