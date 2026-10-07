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
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 300),
  maxBodyBytes: Number(process.env.MAX_BODY_BYTES || 10 * 1024 * 1024),
  trustProxy: Number(process.env.TRUST_PROXY_HOPS || 1),
  logLevel: process.env.LOG_LEVEL || 'info',
} as const;
