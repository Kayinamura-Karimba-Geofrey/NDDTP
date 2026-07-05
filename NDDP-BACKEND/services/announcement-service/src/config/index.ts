import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-announcement-service',
  port: 3028,
  databaseName: 'nddtp_announcement',
  redisDb: 27,
  queuePrefix: 'announcement-service',
});
