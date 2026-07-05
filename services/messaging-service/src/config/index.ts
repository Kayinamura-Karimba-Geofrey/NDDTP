import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-messaging-service',
  port: 3027,
  databaseName: 'nddtp_messaging',
  redisDb: 26,
  queuePrefix: 'messaging-service',
});
