import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-search-service',
  port: 3029,
  databaseName: 'nddtp_search',
  redisDb: 28,
  queuePrefix: 'search-service',
});
