import appConfig from './app.config';
import databaseConfig from './database.config';
import redisConfig from './redis.config';
import rabbitmqConfig from './rabbitmq.config';
import jwtConfig from './jwt.config';
import securityConfig from './security.config';
import loggingConfig from './logging.config';
import authorizationConfig from './authorization.config';

export const configuration = [
  appConfig,
  databaseConfig,
  redisConfig,
  rabbitmqConfig,
  jwtConfig,
  securityConfig,
  loggingConfig,
  authorizationConfig,
];

export {
  appConfig,
  databaseConfig,
  redisConfig,
  rabbitmqConfig,
  jwtConfig,
  securityConfig,
  loggingConfig,
};
