import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/app/guards/RouteGuards';
import { ROUTES } from '@/constants/app';
import { administrationRoutes } from './routes/administration.routes';
import { aiAssistantRoutes } from './routes/ai-assistant.routes';
import { assetsRoutes } from './routes/assets.routes';
import { auditRoutes } from './routes/audit.routes';
import { authenticationRoutes } from './routes/authentication.routes';
import { authorizationRoutes } from './routes/authorization.routes';
import { calendarRoutes } from './routes/calendar.routes';
import { cloudRoutes } from './routes/cloud.routes';
import { dashboardRoutes } from './routes/dashboard.routes';
import { dmsRoutes } from './routes/dms.routes';
import { facilitiesRoutes } from './routes/facilities.routes';
import { financeRoutes } from './routes/finance.routes';
import { fleetRoutes } from './routes/fleet.routes';
import { inventoryRoutes } from './routes/inventory.routes';
import { leaveRoutes } from './routes/leave.routes';
import { logisticsRoutes } from './routes/logistics.routes';
import { maintenanceRoutes } from './routes/maintenance.routes';
import { medicalRoutes } from './routes/medical.routes';
import { messagingRoutes } from './routes/messaging.routes';
import { notificationRoutes } from './routes/notification.routes';
import { performanceRoutes } from './routes/performance.routes';
import { personnelRoutes } from './routes/personnel.routes';
import { procurementRoutes } from './routes/procurement.routes';
import { profileRoutes } from './routes/profile.routes';
import { recruitmentRoutes } from './routes/recruitment.routes';
import { reportingRoutes } from './routes/reporting.routes';
import { searchRoutes } from './routes/search.routes';
import { settingsRoutes } from './routes/settings.routes';
import { trainingRoutes } from './routes/training.routes';
import { usersRoutes } from './routes/users.routes';
import { visitorRoutes } from './routes/visitor.routes';
import { welfareRoutes } from './routes/welfare.routes';
import { workflowRoutes } from './routes/workflow.routes';

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
      ...administrationRoutes,
      ...aiAssistantRoutes,
      ...assetsRoutes,
      ...auditRoutes,
      ...authenticationRoutes,
      ...authorizationRoutes,
      ...calendarRoutes,
      ...cloudRoutes,
      ...dashboardRoutes,
      ...dmsRoutes,
      ...facilitiesRoutes,
      ...financeRoutes,
      ...fleetRoutes,
      ...inventoryRoutes,
      ...leaveRoutes,
      ...logisticsRoutes,
      ...maintenanceRoutes,
      ...medicalRoutes,
      ...messagingRoutes,
      ...notificationRoutes,
      ...performanceRoutes,
      ...personnelRoutes,
      ...procurementRoutes,
      ...profileRoutes,
      ...recruitmentRoutes,
      ...reportingRoutes,
      ...searchRoutes,
      ...settingsRoutes,
      ...trainingRoutes,
      ...usersRoutes,
      ...visitorRoutes,
      ...welfareRoutes,
      ...workflowRoutes,
    ],
  },
  { path: '*', element: wrap(<NotFoundPage />) },
]);
