import { registerAs } from '@nestjs/config';
export default registerAs('security', () => ({
  rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
  rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT || '200', 10),
}));
