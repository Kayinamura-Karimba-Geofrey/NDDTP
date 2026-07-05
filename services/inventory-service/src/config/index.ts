import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-inventory-service',
  port: 3014,
  databaseName: 'nddtp_inventory',
  redisDb: 13,
  queuePrefix: 'inventory-service',
});
