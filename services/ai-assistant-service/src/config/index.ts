import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: 'nddtp-ai-assistant-service',
  port: 3035,
  databaseName: 'nddtp_ai_assistant',
  redisDb: 34,
  queuePrefix: 'ai-assistant-service',
});
