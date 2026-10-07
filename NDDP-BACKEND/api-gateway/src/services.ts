import registry from './shared/service-registry.json' with { type: 'json' };

export const MICROSERVICES = registry as Record<string, { port: number; label: string }>;

export type ServiceKey = keyof typeof MICROSERVICES;

export function resolveService(key: string): { key: ServiceKey; port: number; host: string } | null {
  if (!(key in MICROSERVICES)) return null;
  const serviceKey = key as ServiceKey;
  const host = process.env.SERVICE_HOST || '127.0.0.1';
  return { key: serviceKey, port: MICROSERVICES[serviceKey].port, host };
}

/**
 * Upstream base URL for a service. Set SERVICE_URL_<KEY> (e.g. SERVICE_URL_AUTH,
 * SERVICE_URL_BUSINESS_INTELLIGENCE) when services run on separate hosts, as on Render;
 * otherwise falls back to SERVICE_HOST plus the registry port.
 */
export function upstreamBaseUrl(key: ServiceKey): string {
  const override = process.env[`SERVICE_URL_${key.toUpperCase().replace(/-/g, '_')}`];
  if (override) {
    const url = /^https?:\/\//.test(override) ? override : `http://${override}`;
    return url.replace(/\/+$/, '');
  }
  const host = process.env.SERVICE_HOST || '127.0.0.1';
  return `http://${host}:${MICROSERVICES[key].port}`;
}
