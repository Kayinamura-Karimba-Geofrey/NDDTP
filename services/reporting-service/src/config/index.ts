import { registerAs } from '@nestjs/config';
import databaseConfig from './database.config';
import redisConfig from './redis.config';
import rabbitmqConfig from './rabbitmq.config';
import jwtConfig from './jwt.config';
import securityConfig from './security.config';

const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'nddtp-reporting-service',
  port: parseInt(process.env.APP_PORT || '3024', 10),
  host: process.env.APP_HOST || '0.0.0.0',
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  nodeEnv: process.env.NODE_ENV || 'development',
}));

export const configuration = [appConfig, databaseConfig, redisConfig, rabbitmqConfig, jwtConfig, securityConfig];
export { appConfig, databaseConfig, redisConfig, rabbitmqConfig, jwtConfig, securityConfig };
