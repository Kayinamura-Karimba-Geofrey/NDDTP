import registry from '../../../shared/service-registry.json' with { type: 'json' };
export const MICROSERVICES = registry;
export function resolveService(key) {
    if (!(key in MICROSERVICES))
        return null;
    const serviceKey = key;
    const host = process.env.SERVICE_HOST || '127.0.0.1';
    return { key: serviceKey, port: MICROSERVICES[serviceKey].port, host };
}
export function upstreamBaseUrl(key) {
    const host = process.env.SERVICE_HOST || '127.0.0.1';
    return `http://${host}:${MICROSERVICES[key].port}/api/v1`;
}
//# sourceMappingURL=services.js.map