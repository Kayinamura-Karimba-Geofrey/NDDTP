import 'dotenv/config';

export const config = {
  port: Number(process.env.GATEWAY_PORT || 3000),
  host: process.env.GATEWAY_HOST || '0.0.0.0',
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  servicePrefix: process.env.SERVICE_PREFIX || 'api/svc',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000,http://localhost:4200')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS || 30000),
  logLevel: process.env.LOG_LEVEL || 'info',
} as const;
