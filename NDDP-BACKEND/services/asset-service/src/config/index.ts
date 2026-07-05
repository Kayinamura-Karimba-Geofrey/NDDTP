import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-asset-service',
  port: 3013,
  databaseName: 'nddtp_asset',
  redisDb: 12,
  queuePrefix: 'asset-service',
});
