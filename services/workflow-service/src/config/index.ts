import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-workflow-service',
  port: 3022,
  databaseName: 'nddtp_workflow',
  redisDb: 21,
  queuePrefix: 'workflow-service',
});
