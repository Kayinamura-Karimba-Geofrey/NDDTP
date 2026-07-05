import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-notification-service',
  port: 3004,
  databaseName: 'nddtp_notification',
  redisDb: 3,
  queuePrefix: 'notification-service',
});
