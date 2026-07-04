import { registerAs } from '@nestjs/config';
export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '1', 10),
  ttl: {
    default: parseInt(process.env.REDIS_TTL_DEFAULT || '300', 10),
    userPermissions: parseInt(process.env.REDIS_TTL_USER_PERMISSIONS || '900', 10),
    role: parseInt(process.env.REDIS_TTL_ROLE || '3600', 10),
  },
}));
