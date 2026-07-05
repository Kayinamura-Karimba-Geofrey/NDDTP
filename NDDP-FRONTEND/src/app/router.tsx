import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/app/guards/RouteGuards';
import { ROUTES } from '@/constants/app';

const LoginPage = lazy(() => import('@/modules/authentication/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const OtpPage = lazy(() => import('@/modules/authentication/pages/OtpPage').then((m) => ({ default: m.OtpPage })));
const SessionExpiredPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.SessionExpiredPage })));
const ResetPasswordPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.ResetPasswordPage })));
const ChangePasswordPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.ChangePasswordPage })));
const UnauthorizedPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.UnauthorizedPage })));
const ForbiddenPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ForbiddenPage })));
const NotFoundPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.NotFoundPage })));
const ServerErrorPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ServerErrorPage })));
const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ModulePlaceholder = lazy(() => import('@/components/shared/ModulePlaceholder').then((m) => ({ default: m.ModulePlaceholder })));

const wrap = (element: React.ReactNode) => (
  <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
);

const moduleRoute = (path: string, title: string, description: string, service: string): RouteObject => ({
  path,
  element: wrap(<ModulePlaceholder title={title} description={description} module={service} />),
});

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  {
    path: '/auth',
    children: [
      { path: 'login', element: wrap(<PublicRoute><LoginPage /></PublicRoute>) },
      { path: 'forgot-password', element: wrap(<PublicRoute><ForgotPasswordPage /></PublicRoute>) },
      { path: 'otp', element: wrap(<PublicRoute><OtpPage /></PublicRoute>) },
      { path: 'session-expired', element: wrap(<SessionExpiredPage />) },
      { path: 'reset-password', element: wrap(<ResetPasswordPage />) },
      { path: 'change-password', element: wrap(<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>) },
    ],
  },
  { path: '/unauthorized', element: wrap(<UnauthorizedPage />) },
  { path: '/403', element: wrap(<ForbiddenPage />) },
  { path: '/404', element: wrap(<NotFoundPage />) },
  { path: '/500', element: wrap(<ServerErrorPage />) },
  {
    element: wrap(<ProtectedRoute><MainLayout /></ProtectedRoute>),
    children: [
      { path: 'dashboard', element: wrap(<DashboardPage />) },
      moduleRoute('profile', 'My Profile', 'Manage your personal information and preferences.', 'user'),
      moduleRoute('users/*', 'User Management', 'Manage platform users, departments, and access.', 'user'),
      moduleRoute('personnel/*', 'Personnel', 'HR records, ranks, assignments, and qualifications.', 'personnel'),
      moduleRoute('recruitment/*', 'Recruitment', 'Job postings, applications, and interviews.', 'recruitment'),
      moduleRoute('leave/*', 'Leave Management', 'Leave requests, balances, and approvals.', 'leave'),
      moduleRoute('welfare/*', 'Welfare', 'Benefits programs, claims, and dependents.', 'welfare'),
      moduleRoute('medical/*', 'Medical Services', 'Appointments, records, fitness, and certificates.', 'medical'),
      moduleRoute('training/*', 'Training', 'Courses, sessions, enrollments, and certifications.', 'training'),
      moduleRoute('performance/*', 'Performance', 'Cycles, goals, reviews, and improvement plans.', 'performance'),
      moduleRoute('assets/*', 'Assets', 'Asset categories, assignments, movements, and audits.', 'asset'),
      moduleRoute('inventory/*', 'Inventory', 'Warehouses, stock levels, movements, and requests.', 'inventory'),
      moduleRoute('logistics/*', 'Logistics', 'Locations, routes, shipments, and tracking.', 'logistics'),
      moduleRoute('procurement/*', 'Procurement', 'Vendors, requisitions, orders, and receipts.', 'procurement'),
      moduleRoute('fleet/*', 'Fleet', 'Vehicles, assignments, trips, and inspections.', 'fleet'),
      moduleRoute('maintenance/*', 'Maintenance', 'Work orders, tasks, and maintenance logs.', 'maintenance'),
      moduleRoute('facilities/*', 'Facilities', 'Facilities, spaces, and bookings.', 'facilities'),
      moduleRoute('finance/*', 'Finance', 'Budgets, allocations, and expenditures.', 'finance'),
      moduleRoute('visitors/*', 'Visitors', 'Sites, visitors, visits, and check-in.', 'visitor'),
      moduleRoute('workflow/*', 'Workflow', 'Definitions, instances, tasks, and approvals.', 'workflow'),
      moduleRoute('calendar/*', 'Calendar', 'Calendars, events, and attendees.', 'calendar'),
      moduleRoute('reports/*', 'Reports', 'Report definitions, requests, and outputs.', 'reporting'),
      moduleRoute('analytics/*', 'Analytics', 'Metrics, dashboards, and queries.', 'analytics'),
      moduleRoute('business-intelligence/*', 'Business Intelligence', 'Datasets, models, and BI reports.', 'business-intelligence'),
      moduleRoute('notifications/*', 'Notifications', 'Email, SMS, push, and in-app notifications.', 'notification'),
      moduleRoute('messaging/*', 'Messaging', 'Channels, messages, and delivery.', 'messaging'),
      moduleRoute('search/*', 'Search', 'Indexes, documents, and queries.', 'search'),
      moduleRoute('ai-assistant/*', 'AI Assistant', 'Agents, conversations, and messages.', 'ai-assistant'),
      moduleRoute('settings/*', 'Settings', 'Platform and user preferences.', 'configuration'),
      moduleRoute('administration/*', 'Administration', 'System administration and configuration.', 'configuration'),
      moduleRoute('audit-logs/*', 'Audit Logs', 'Compliance audit logging and security events.', 'audit'),
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
