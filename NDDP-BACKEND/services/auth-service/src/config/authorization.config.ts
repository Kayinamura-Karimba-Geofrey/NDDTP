import { registerAs } from '@nestjs/config';

export default registerAs('authorization', () => ({
  serviceUrl: process.env.AUTHORIZATION_SERVICE_URL || 'http://127.0.0.1:3002/api/v1',
  internalServiceKey: process.env.INTERNAL_SERVICE_KEY || 'change_me_internal_service_key',
}));
