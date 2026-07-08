const fs = require('fs');
const path = require('path');

const routerPath = path.join('d:/NDDTP/NDDP-FRONTEND/src/app/router.tsx');
const src = fs.readFileSync(routerPath, 'utf8');

const lazyRe = /const (\w+) = lazy\(\(\) => import\('([^']+)'\)\.then\(\(m\) => \(\{ default: m\.(\w+) \}\)\)\);/g;
const lazies = [];
let m;
while ((m = lazyRe.exec(src))) {
  lazies.push({ name: m[1], importPath: m[2], exportName: m[3] });
}
const lazyByName = Object.fromEntries(lazies.map((l) => [l.name, l]));

const startMarker = 'element: wrap(<ProtectedRoute><MainLayout /></ProtectedRoute>),';
const startIdx = src.indexOf(startMarker);
if (startIdx < 0) throw new Error('protected layout not found');
const childrenStart = src.indexOf('children: [', startIdx);
const afterBracket = childrenStart + 'children: ['.length;

let depth = 1;
let i = afterBracket;
while (i < src.length && depth > 0) {
  const ch = src[i];
  if (ch === '[') depth++;
  else if (ch === ']') depth--;
  i++;
}
const childrenSrc = src.slice(afterBracket, i - 1);

const entries = [];
const entryRe = /\{ path: '[^']+'[\s\S]*?\},/g;
let e;
while ((e = entryRe.exec(childrenSrc))) {
  entries.push(e[0].trim().replace(/,$/, ''));
}

function groupKey(entry) {
  const pm = entry.match(/path: '([^']+)'/);
  if (!pm) return 'misc';
  const p = pm[1];
  if (p.startsWith('auth/')) return 'authentication';
  if (p === 'dashboard') return 'dashboard';
  if (p.startsWith('cloud')) return 'cloud';
  if (p.startsWith('profile')) return 'profile';
  if (p.startsWith('users')) return 'users';
  if (p.startsWith('personnel')) return 'personnel';
  if (p.startsWith('recruitment')) return 'recruitment';
  if (p.startsWith('leave')) return 'leave';
  if (p.startsWith('welfare')) return 'welfare';
  if (p.startsWith('medical')) return 'medical';
  if (p.startsWith('training')) return 'training';
  if (p.startsWith('assets')) return 'assets';
  if (p.startsWith('inventory')) return 'inventory';
  if (p.startsWith('procurement')) return 'procurement';
  if (p.startsWith('finance')) return 'finance';
  if (p.startsWith('performance')) return 'performance';
  if (p.startsWith('logistics')) return 'logistics';
  if (p.startsWith('fleet')) return 'fleet';
  if (p.startsWith('dms')) return 'dms';
  if (p.startsWith('workflow')) return 'workflow';
  if (p.startsWith('notifications') || p.startsWith('announcements')) return 'notification';
  if (p.startsWith('maintenance')) return 'maintenance';
  if (p.startsWith('facilities')) return 'facilities';
  if (p.startsWith('visitors')) return 'visitor';
  if (p.startsWith('calendar')) return 'calendar';
  if (p.startsWith('reports') || p.startsWith('analytics') || p.startsWith('business-intelligence')) return 'reporting';
  if (p.startsWith('messaging')) return 'messaging';
  if (p.startsWith('search')) return 'search';
  if (p.startsWith('ai-assistant')) return 'ai-assistant';
  if (p.startsWith('settings')) return 'settings';
  if (p.startsWith('administration')) {
    const authzHints = [
      'authorization', 'roles', 'permission', 'assignments', 'access-', 'delegated',
      'approval-levels', 'temporary-access', 'resource-permissions', 'menu-permissions',
      'action-permissions', 'role-hierarchy',
    ];
    if (authzHints.some((h) => p.includes(h))) return 'authorization';
    return 'administration';
  }
  if (p.startsWith('audit')) return 'audit';
  return 'misc';
}

const groups = {};
for (const entry of entries) {
  const g = groupKey(entry);
  (groups[g] ||= []).push(entry);
}

function usedLazies(groupEntries) {
  const names = new Set();
  for (const entry of groupEntries) {
    const re = /<(\w+)\s*\/>/g;
    let mm;
    while ((mm = re.exec(entry))) names.add(mm[1]);
  }
  return [...names].filter((n) => lazyByName[n]);
}

const outDir = path.join('d:/NDDTP/NDDP-FRONTEND/src/app/routes');
fs.mkdirSync(outDir, { recursive: true });

const exportMap = {
  authentication: 'authenticationRoutes',
  dashboard: 'dashboardRoutes',
  cloud: 'cloudRoutes',
  profile: 'profileRoutes',
  users: 'usersRoutes',
  personnel: 'personnelRoutes',
  recruitment: 'recruitmentRoutes',
  leave: 'leaveRoutes',
  welfare: 'welfareRoutes',
  medical: 'medicalRoutes',
  training: 'trainingRoutes',
  assets: 'assetsRoutes',
  inventory: 'inventoryRoutes',
  procurement: 'procurementRoutes',
  finance: 'financeRoutes',
  performance: 'performanceRoutes',
  logistics: 'logisticsRoutes',
  fleet: 'fleetRoutes',
  dms: 'dmsRoutes',
  workflow: 'workflowRoutes',
  notification: 'notificationRoutes',
  maintenance: 'maintenanceRoutes',
  facilities: 'facilitiesRoutes',
  visitor: 'visitorRoutes',
  calendar: 'calendarRoutes',
  reporting: 'reportingRoutes',
  messaging: 'messagingRoutes',
  search: 'searchRoutes',
  'ai-assistant': 'aiAssistantRoutes',
  settings: 'settingsRoutes',
  authorization: 'authorizationRoutes',
  administration: 'administrationRoutes',
  audit: 'auditRoutes',
  misc: 'miscRoutes',
};

const routeModules = [];
for (const group of Object.keys(groups).sort()) {
  const groupEntries = groups[group];
  const names = usedLazies(groupEntries);
  const lazyLines = names.map((n) => {
    const l = lazyByName[n];
    return `const ${l.name} = lazy(() => import('${l.importPath}').then((m) => ({ default: m.${l.exportName} })));`;
  });
  const fileName = `${group}.routes.tsx`;
  const exp = exportMap[group] || `${group}Routes`;
  routeModules.push({ group, fileName, exp });
  const body = `import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { SuspenseFallback } from '@/app/guards/RouteGuards';

function wrap(element: ReactNode) {
  return <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>;
}

${lazyLines.join('\n')}

export const ${exp}: RouteObject[] = [
${groupEntries.map((x) => `  ${x},`).join('\n')}
];
`;
  fs.writeFileSync(path.join(outDir, fileName), body);
}

const composed = `import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/app/guards/RouteGuards';
import { ROUTES } from '@/constants/app';
${routeModules.map((e) => `import { ${e.exp} } from './routes/${e.fileName.replace('.tsx', '')}';`).join('\n')}

const LoginPage = lazy(() => import('@/modules/authentication/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const OtpPage = lazy(() => import('@/modules/authentication/pages/OtpPage').then((m) => ({ default: m.OtpPage })));
const SessionExpiredPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.SessionExpiredPage })));
const ResetPasswordPage = lazy(() => import('@/modules/authentication/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const AccountLockedPage = lazy(() => import('@/modules/authentication/pages/AccountLockedPage').then((m) => ({ default: m.AccountLockedPage })));
const UnauthorizedPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.UnauthorizedPage })));
const ForbiddenPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ForbiddenPage })));
const NotFoundPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.NotFoundPage })));
const ServerErrorPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ServerErrorPage })));

function wrap(element: ReactNode) {
  return <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  {
    path: '/auth',
    children: [
      { path: 'login', element: wrap(<PublicRoute><LoginPage /></PublicRoute>) },
      { path: 'forgot-password', element: wrap(<PublicRoute><ForgotPasswordPage /></PublicRoute>) },
      { path: 'otp', element: wrap(<PublicRoute><OtpPage /></PublicRoute>) },
      { path: 'session-expired', element: wrap(<SessionExpiredPage />) },
      { path: 'account-locked', element: wrap(<AccountLockedPage />) },
      { path: 'reset-password', element: wrap(<PublicRoute><ResetPasswordPage /></PublicRoute>) },
    ],
  },
  { path: '/unauthorized', element: wrap(<UnauthorizedPage />) },
  { path: '/403', element: wrap(<ForbiddenPage />) },
  { path: '/404', element: wrap(<NotFoundPage />) },
  { path: '/500', element: wrap(<ServerErrorPage />) },
  {
    element: wrap(<ProtectedRoute><MainLayout /></ProtectedRoute>),
    children: [
${routeModules.map((e) => `      ...${e.exp},`).join('\n')}
    ],
  },
  { path: '*', element: wrap(<NotFoundPage />) },
]);
`;

fs.writeFileSync(routerPath, composed);
console.log(JSON.stringify({
  groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])),
  modules: routeModules.length,
  entries: entries.length,
}, null, 2));
