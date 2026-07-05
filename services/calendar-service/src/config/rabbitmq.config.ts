import { registerAs } from '@nestjs/config';
export default registerAs('rabbitmq', () => ({
  url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  exchange: process.env.RABBITMQ_EXCHANGE || 'nddtp.events',
  dlxExchange: process.env.RABBITMQ_DLX_EXCHANGE || 'nddtp.events.dlx',
  queuePrefix: process.env.RABBITMQ_QUEUE_PREFIX || 'calendar-service',
}));
