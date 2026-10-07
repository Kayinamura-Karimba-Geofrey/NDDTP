import { registerAs } from '@nestjs/config';

/** Dev-only fallbacks; production must provide real secrets or the service refuses to start. */
function secret(value: string | undefined, devFallback: string, name: string): string {
  if (value) return value;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`${name} must be set in production`);
  }
  return devFallback;
}

export default registerAs('jwt', () => ({
  // JWT_SECRET is accepted as an alias because older deploy configs (render.yaml) used that name.
  accessSecret: secret(
    process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    'change_me_access_secret',
    'JWT_ACCESS_SECRET',
  ),
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshSecret: secret(process.env.JWT_REFRESH_SECRET, 'change_me_refresh_secret', 'JWT_REFRESH_SECRET'),
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  issuer: process.env.JWT_ISSUER || 'nddtp-auth-service',
  audience: process.env.JWT_AUDIENCE || 'nddtp-platform',
}));
