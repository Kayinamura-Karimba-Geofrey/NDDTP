import { registerAs } from '@nestjs/config';
export default registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET || 'change_me_access_secret',
  issuer: process.env.JWT_ISSUER || 'nddtp-auth-service',
  audience: process.env.JWT_AUDIENCE || 'nddtp-platform',
}));
