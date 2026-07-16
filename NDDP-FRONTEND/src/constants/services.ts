export type { ServiceKey } from '@nddtp/registry';
export { MICROSERVICES } from '@nddtp/registry';

/** Dev proxy prefix: /api/svc/{key}/... → gateway → service /api/v1/... */
export const API_SERVICE_BASE = '/api/svc';
