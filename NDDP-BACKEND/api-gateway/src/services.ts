/** Service registry — mirrors NDDP-FRONTEND/src/constants/services.ts */
export const MICROSERVICES = {
  auth: { port: 3001, label: 'Authentication' },
  authorization: { port: 3002, label: 'Authorization' },
  user: { port: 3003, label: 'User Management' },
  notification: { port: 3004, label: 'Notifications' },
  audit: { port: 3005, label: 'Audit Logs' },
  personnel: { port: 3006, label: 'Personnel' },
  recruitment: { port: 3007, label: 'Recruitment' },
  leave: { port: 3008, label: 'Leave' },
  welfare: { port: 3009, label: 'Welfare' },
  medical: { port: 3010, label: 'Medical' },
  training: { port: 3011, label: 'Training' },
  performance: { port: 3012, label: 'Performance' },
  asset: { port: 3013, label: 'Assets' },
  inventory: { port: 3014, label: 'Inventory' },
  logistics: { port: 3015, label: 'Logistics' },
  procurement: { port: 3016, label: 'Procurement' },
  fleet: { port: 3017, label: 'Fleet' },
  maintenance: { port: 3018, label: 'Maintenance' },
  facilities: { port: 3019, label: 'Facilities' },
  finance: { port: 3020, label: 'Finance' },
  visitor: { port: 3021, label: 'Visitors' },
  workflow: { port: 3022, label: 'Workflow' },
  calendar: { port: 3023, label: 'Calendar' },
  reporting: { port: 3024, label: 'Reporting' },
  analytics: { port: 3025, label: 'Analytics' },
  'business-intelligence': { port: 3026, label: 'Business Intelligence' },
  messaging: { port: 3027, label: 'Messaging' },
  announcement: { port: 3028, label: 'Announcements' },
  search: { port: 3029, label: 'Search' },
  configuration: { port: 3030, label: 'Configuration' },
  integration: { port: 3031, label: 'Integration' },
  'api-management': { port: 3032, label: 'API Management' },
  backup: { port: 3033, label: 'Backup' },
  monitoring: { port: 3034, label: 'Monitoring' },
  'ai-assistant': { port: 3035, label: 'AI Assistant' },
} as const;

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
