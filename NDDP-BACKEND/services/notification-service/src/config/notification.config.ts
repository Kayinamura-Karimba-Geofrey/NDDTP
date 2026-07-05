import { registerAs } from '@nestjs/config';
export default registerAs('notification', () => ({
  maxRetries: parseInt(process.env.NOTIFICATION_MAX_RETRIES || '3', 10),
  retryDelayMs: parseInt(process.env.NOTIFICATION_RETRY_DELAY_MS || '60000', 10),
}));
