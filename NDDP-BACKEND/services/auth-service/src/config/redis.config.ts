import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  ttl: {
    default: parseInt(process.env.REDIS_TTL_DEFAULT || '300', 10),
    session: parseInt(process.env.REDIS_TTL_SESSION || '3600', 10),
    refreshToken: parseInt(process.env.REDIS_TTL_REFRESH_TOKEN || '604800', 10),
  },
}));
