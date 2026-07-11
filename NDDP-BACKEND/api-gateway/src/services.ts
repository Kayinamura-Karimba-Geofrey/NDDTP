import registry from '../../../shared/service-registry.json' with { type: 'json' };

export const MICROSERVICES = registry as Record<string, { port: number; label: string }>;

export type ServiceKey = keyof typeof MICROSERVICES;

export function resolveService(key: string): { key: ServiceKey; port: number; host: string } | null {
  if (!(key in MICROSERVICES)) return null;
  const serviceKey = key as ServiceKey;
  const host = process.env.SERVICE_HOST || '127.0.0.1';
  return { key: serviceKey, port: MICROSERVICES[serviceKey].port, host };
}

export function upstreamBaseUrl(key: ServiceKey): string {
  const host = process.env.SERVICE_HOST || '127.0.0.1';
  return `http://${host}:${MICROSERVICES[key].port}`;
}
