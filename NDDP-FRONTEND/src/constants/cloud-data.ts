export interface CloudEnvironment {
  id: string;
  name: string;
  region: string;
  provider: string;
  status: 'healthy' | 'degraded' | 'maintenance';
  url: string;
  servicesRunning: number;
  totalServices: number;
  lastDeploy: string;
  version: string;
}

export interface CloudDeployment {
  id: string;
  environment: string;
  service: string;
  version: string;
  status: 'success' | 'failed' | 'in_progress' | 'rolled_back';
  deployedBy: string;
  deployedAt: string;
  duration: string;
}

export const CLOUD_ENVIRONMENTS: CloudEnvironment[] = [
  {
    id: 'prod',
    name: 'Production',
    region: 'af-south-1 · Kigali',
    provider: 'NDDTP Cloud',
    status: 'healthy',
    url: 'https://nddtp.mod.gov.rw',
    servicesRunning: 35,
    totalServices: 35,
    lastDeploy: '2026-07-06T14:30:00Z',
    version: 'v1.0.0',
  },
  {
    id: 'staging',
    name: 'Staging',
    region: 'af-south-1 · Kigali',
    provider: 'NDDTP Cloud',
    status: 'healthy',
    url: 'https://staging.nddtp.mod.gov.rw',
    servicesRunning: 35,
    totalServices: 35,
    lastDeploy: '2026-07-06T12:00:00Z',
    version: 'v1.0.0-rc.2',
  },
  {
    id: 'dev',
    name: 'Development',
    region: 'local · Docker',
    provider: 'NDDTP Cloud',
    status: 'degraded',
    url: 'http://localhost:3000',
    servicesRunning: 5,
    totalServices: 35,
    lastDeploy: '2026-07-07T00:00:00Z',
    version: 'v1.0.0-dev',
  },
];

export const RECENT_DEPLOYMENTS: CloudDeployment[] = [
  {
    id: 'd1',
    environment: 'Production',
    service: 'api-gateway',
    version: 'v1.0.0',
    status: 'success',
    deployedBy: 'CI/CD Pipeline',
    deployedAt: '2026-07-06T14:30:00Z',
    duration: '2m 14s',
  },
  {
    id: 'd2',
    environment: 'Production',
    service: 'auth-service',
    version: 'v1.0.0',
    status: 'success',
    deployedBy: 'CI/CD Pipeline',
    deployedAt: '2026-07-06T14:28:00Z',
    duration: '1m 52s',
  },
  {
    id: 'd3',
    environment: 'Staging',
    service: 'personnel-service',
    version: 'v1.0.0-rc.2',
    status: 'success',
    deployedBy: 'admin@mod.gov.rw',
    deployedAt: '2026-07-06T12:00:00Z',
    duration: '3m 05s',
  },
  {
    id: 'd4',
    environment: 'Development',
    service: 'user-service',
    version: 'v1.0.0-dev',
    status: 'in_progress',
    deployedBy: 'dev@mod.gov.rw',
    deployedAt: '2026-07-07T00:15:00Z',
    duration: '—',
  },
  {
    id: 'd5',
    environment: 'Staging',
    service: 'notification-service',
    version: 'v1.0.0-rc.1',
    status: 'rolled_back',
    deployedBy: 'CI/CD Pipeline',
    deployedAt: '2026-07-05T18:45:00Z',
    duration: '4m 30s',
  },
];
