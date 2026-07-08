import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const CloudOverviewPage = lazy(() => import('@/modules/cloud/pages/CloudOverviewPage').then((m) => ({ default: m.CloudOverviewPage })));
const CloudServicesPage = lazy(() => import('@/modules/cloud/pages/CloudServicesPage').then((m) => ({ default: m.CloudServicesPage })));
const CloudEnvironmentsPage = lazy(() => import('@/modules/cloud/pages/CloudEnvironmentsPage').then((m) => ({ default: m.CloudEnvironmentsPage })));
const CloudGatewayPage = lazy(() => import('@/modules/cloud/pages/CloudGatewayPage').then((m) => ({ default: m.CloudGatewayPage })));
const CloudDeploymentsPage = lazy(() => import('@/modules/cloud/pages/CloudDeploymentsPage').then((m) => ({ default: m.CloudDeploymentsPage })));

export const cloudRoutes: RouteObject[] = [
  { path: 'cloud', element: wrap(<CloudOverviewPage />) },
  { path: 'cloud/services', element: wrap(<CloudServicesPage />) },
  { path: 'cloud/environments', element: wrap(<CloudEnvironmentsPage />) },
  { path: 'cloud/gateway', element: wrap(<CloudGatewayPage />) },
  { path: 'cloud/deployments', element: wrap(<CloudDeploymentsPage />) },
];
