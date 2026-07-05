import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-medical-service',
  port: 3010,
  databaseName: 'nddtp_medical',
  redisDb: 9,
  queuePrefix: 'medical-service',
});
