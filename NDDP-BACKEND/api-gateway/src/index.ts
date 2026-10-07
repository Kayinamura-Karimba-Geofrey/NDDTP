import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { createProxyMiddleware, type Options, type RequestHandler } from 'http-proxy-middleware';
import { config } from './config.js';
import { MICROSERVICES, resolveService, upstreamBaseUrl, type ServiceKey } from './services.js';

const app = express();

// Behind Render's load balancer: trust the proxy so rate limiting keys on the real client IP.
app.set('trust proxy', config.trustProxy);
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-Id', 'X-Request-Id'],
    exposedHeaders: ['X-Correlation-Id'],
    credentials: true,
    maxAge: 3600,
  }),
);

// Proxy routes only — do not use express.json() here; it consumes POST bodies before forwarding.

app.use(
  rateLimit({
    windowMs: config.rateLimitWindowMs,
    limit: config.rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skip: (req) => req.path === '/health',
    message: { statusCode: 429, message: 'Too many requests, please try again later.', error: 'TooManyRequests' },
  }),
);

// Bodies are streamed to upstreams unparsed, so enforce the size limit from Content-Length.
app.use((req, res, next) => {
  const length = Number(req.headers['content-length'] || 0);
  if (length > config.maxBodyBytes) {
    res.status(413).json({ statusCode: 413, message: 'Request body too large', error: 'PayloadTooLarge' });
    return;
  }
  next();
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'nddtp-api-gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    routes: Object.keys(MICROSERVICES).length,
  });
});

app.get('/health/services', async (_req, res) => {
  const checks = await Promise.all(
    Object.entries(MICROSERVICES).map(async ([key, { port, label }]) => {
      const healthUrl = `${upstreamBaseUrl(key)}/${config.apiPrefix}/health/live`;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const response = await fetch(healthUrl, { signal: controller.signal });
        clearTimeout(timeout);
        return { key, label, port, status: response.ok ? 'up' : 'down', statusCode: response.status };
      } catch {
        return { key, label, port, status: 'down' as const };
      }
    }),
  );
  const up = checks.filter((c) => c.status === 'up').length;
  res.json({
    status: up === checks.length ? 'ok' : up > 0 ? 'degraded' : 'down',
    summary: { total: checks.length, up, down: checks.length - up },
    services: checks,
    timestamp: new Date().toISOString(),
  });
});

app.get(`/${config.servicePrefix}`, (_req, res) => {
  res.json({
    gateway: 'NDDTP API Gateway',
    prefix: `/${config.servicePrefix}/{serviceKey}`,
    upstreamPattern: `http://{host}:{port}/${config.apiPrefix}/...`,
    services: Object.entries(MICROSERVICES).map(([key, { port, label }]) => ({
      key,
      label,
      port,
      path: `/${config.servicePrefix}/${key}`,
    })),
  });
});

function createServiceProxy(serviceKey: ServiceKey): Options {
  const target = upstreamBaseUrl(serviceKey);
  return {
    target,
    changeOrigin: true,
    proxyTimeout: config.requestTimeoutMs,
    timeout: config.requestTimeoutMs,
    pathRewrite: (path) => `/${config.apiPrefix}${path}`,
    on: {
      proxyReq: (proxyReq, req) => {
        if (!proxyReq.getHeader('x-correlation-id') && req.headers['x-correlation-id']) {
          proxyReq.setHeader('x-correlation-id', req.headers['x-correlation-id'] as string);
        }
        if (config.logLevel === 'debug') {
          console.log(`[proxy] ${req.method} ${req.url} → ${target}/${config.apiPrefix}${req.url}`);
        }
      },
      error: (err, req, res) => {
        console.error(`[proxy] ${serviceKey} error:`, err.message);
        if ('writeHead' in res && typeof res.writeHead === 'function') {
          (res as express.Response).status(502).json({
            statusCode: 502,
            message: `Upstream service "${serviceKey}" is unavailable`,
            error: 'BadGateway',
          });
        }
      },
    },
  };
}

// Build each proxy once at startup; creating one per request leaks sockets and listeners.
const proxies = new Map<ServiceKey, RequestHandler>(
  (Object.keys(MICROSERVICES) as ServiceKey[]).map((key) => [key, createProxyMiddleware(createServiceProxy(key))]),
);

const serviceProxyRouter = express.Router({ mergeParams: true });

serviceProxyRouter.use((req, res, next) => {
  const serviceKey = req.params.serviceKey as string;
  const resolved = resolveService(serviceKey);
  if (!resolved) {
    res.status(404).json({
      statusCode: 404,
      message: `Unknown service "${serviceKey}". GET /${config.servicePrefix} for the service catalog.`,
      error: 'NotFound',
    });
    return;
  }
  proxies.get(resolved.key)!(req, res, next);
});

app.use(`/${config.servicePrefix}/:serviceKey`, serviceProxyRouter);

app.use((_req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route not found. Use /api/svc/{serviceKey}/... to reach microservices.',
    error: 'NotFound',
  });
});

app.listen(config.port, config.host, () => {
  console.log(`NDDTP API Gateway listening on http://${config.host}:${config.port}`);
  console.log(`  Service catalog: http://localhost:${config.port}/${config.servicePrefix}`);
  console.log(`  Health:          http://localhost:${config.port}/health`);
  console.log(`  Example:         http://localhost:${config.port}/${config.servicePrefix}/auth/auth/login`);
});
