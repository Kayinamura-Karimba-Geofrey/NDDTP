import registry from './service-registry.json';

export const MICROSERVICES = registry as {
  readonly [K in keyof typeof registry]: { readonly port: number; readonly label: string };
};

export type ServiceKey = keyof typeof MICROSERVICES;

export const CORE_DEV_SERVICES = [
  'auth-service',
  'authorization-service',
  'user-service',
  'notification-service',
  'personnel-service',
] as const;

export const SERVICE_DIR_PORTS: Record<(typeof CORE_DEV_SERVICES)[number], number> = {
  'auth-service': MICROSERVICES.auth.port,
  'authorization-service': MICROSERVICES.authorization.port,
  'user-service': MICROSERVICES.user.port,
  'notification-service': MICROSERVICES.notification.port,
  'personnel-service': MICROSERVICES.personnel.port,
};
