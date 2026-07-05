import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-calendar-service',
  port: 3023,
  databaseName: 'nddtp_calendar',
  redisDb: 22,
  queuePrefix: 'calendar-service',
});
