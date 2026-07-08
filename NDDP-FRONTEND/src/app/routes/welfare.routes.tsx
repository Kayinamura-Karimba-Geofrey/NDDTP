import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const WelfareDashboardPage = lazy(() => import('@/modules/welfare/pages/WelfareDashboardPage').then((m) => ({ default: m.WelfareDashboardPage })));
const MyWelfarePage = lazy(() => import('@/modules/welfare/pages/MyWelfarePage').then((m) => ({ default: m.MyWelfarePage })));
const WelfareProgramsPage = lazy(() => import('@/modules/welfare/pages/WelfareProgramsPage').then((m) => ({ default: m.WelfareProgramsPage })));
const BenefitManagementPage = lazy(() => import('@/modules/welfare/pages/BenefitManagementPage').then((m) => ({ default: m.BenefitManagementPage })));
const NewAssistanceRequestPage = lazy(() => import('@/modules/welfare/pages/NewAssistanceRequestPage').then((m) => ({ default: m.NewAssistanceRequestPage })));
const AssistanceRequestsPage = lazy(() => import('@/modules/welfare/pages/AssistanceRequestsPage').then((m) => ({ default: m.AssistanceRequestsPage })));
const EmergencySupportPage = lazy(() => import('@/modules/welfare/pages/EmergencySupportPage').then((m) => ({ default: m.EmergencySupportPage })));
const CounselingReferralsPage = lazy(() => import('@/modules/welfare/pages/CounselingReferralsPage').then((m) => ({ default: m.CounselingReferralsPage })));
const FamilySupportPage = lazy(() => import('@/modules/welfare/pages/FamilySupportPage').then((m) => ({ default: m.FamilySupportPage })));
const WellnessProgramsPage = lazy(() => import('@/modules/welfare/pages/WellnessProgramsPage').then((m) => ({ default: m.WellnessProgramsPage })));
const WelfareEventsPage = lazy(() => import('@/modules/welfare/pages/WelfareEventsPage').then((m) => ({ default: m.WelfareEventsPage })));
const WelfareApplicationsPage = lazy(() => import('@/modules/welfare/pages/WelfareApplicationsPage').then((m) => ({ default: m.WelfareApplicationsPage })));
const WelfareApprovalCenterPage = lazy(() => import('@/modules/welfare/pages/WelfareApprovalCenterPage').then((m) => ({ default: m.WelfareApprovalCenterPage })));
const WelfareDocumentsPage = lazy(() => import('@/modules/welfare/pages/WelfareDocumentsPage').then((m) => ({ default: m.WelfareDocumentsPage })));
const WelfareHistoryPage = lazy(() => import('@/modules/welfare/pages/WelfareHistoryPage').then((m) => ({ default: m.WelfareHistoryPage })));
const WelfareReportsPage = lazy(() => import('@/modules/welfare/pages/WelfareReportsPage').then((m) => ({ default: m.WelfareReportsPage })));
const WelfareSettingsPage = lazy(() => import('@/modules/welfare/pages/WelfareSettingsPage').then((m) => ({ default: m.WelfareSettingsPage })));

export const welfareRoutes: RouteObject[] = [
  { path: 'welfare', element: <Navigate to="/welfare/dashboard" replace /> },
  { path: 'welfare/dashboard', element: wrap(<WelfareDashboardPage />) },
  { path: 'welfare/my-welfare', element: wrap(<MyWelfarePage />) },
  { path: 'welfare/programs', element: wrap(<WelfareProgramsPage />) },
  { path: 'welfare/benefits', element: wrap(<BenefitManagementPage />) },
  { path: 'welfare/assistance/new', element: wrap(<NewAssistanceRequestPage />) },
  { path: 'welfare/assistance', element: wrap(<AssistanceRequestsPage />) },
  { path: 'welfare/emergency', element: wrap(<EmergencySupportPage />) },
  { path: 'welfare/counseling', element: wrap(<CounselingReferralsPage />) },
  { path: 'welfare/family-support', element: wrap(<FamilySupportPage />) },
  { path: 'welfare/wellness', element: wrap(<WellnessProgramsPage />) },
  { path: 'welfare/events', element: wrap(<WelfareEventsPage />) },
  { path: 'welfare/applications', element: wrap(<WelfareApplicationsPage />) },
  { path: 'welfare/approvals', element: wrap(<WelfareApprovalCenterPage />) },
  { path: 'welfare/documents', element: wrap(<WelfareDocumentsPage />) },
  { path: 'welfare/history', element: wrap(<WelfareHistoryPage />) },
  { path: 'welfare/reports', element: wrap(<WelfareReportsPage />) },
  { path: 'welfare/settings', element: wrap(<WelfareSettingsPage />) },
];
