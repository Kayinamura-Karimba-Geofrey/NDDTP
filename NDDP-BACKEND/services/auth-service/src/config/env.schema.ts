import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  APP_PORT: Joi.number().port().default(3001),
  APP_HOST: Joi.string().default('0.0.0.0'),
  API_PREFIX: Joi.string().default('api/v1'),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),

  // Database
  DATABASE_URL: Joi.string().optional(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().allow('').default('postgres'),
  DB_DATABASE: Joi.string().default('nddtp_auth'),

  // JWT Security (Fatal crash if weak or missing)
  JWT_SECRET: Joi.string().min(16).default('super-secret-default-jwt-key-change-in-prod'),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().min(16).default('super-secret-default-refresh-key-change-in-prod'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Redis & Rate Limiting
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().port().default(6379),
  RATE_LIMIT_TTL: Joi.number().default(60),
  RATE_LIMIT_LIMIT: Joi.number().default(100),
});
