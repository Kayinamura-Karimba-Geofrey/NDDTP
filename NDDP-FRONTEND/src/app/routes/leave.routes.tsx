import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const LeaveDashboardPage = lazy(() => import('@/modules/leave/pages/LeaveDashboardPage').then((m) => ({ default: m.LeaveDashboardPage })));
const MyLeavePage = lazy(() => import('@/modules/leave/pages/MyLeavePage').then((m) => ({ default: m.MyLeavePage })));
const LeaveRequestsPage = lazy(() => import('@/modules/leave/pages/LeaveRequestsPage').then((m) => ({ default: m.LeaveRequestsPage })));
const RequestLeavePage = lazy(() => import('@/modules/leave/pages/RequestLeavePage').then((m) => ({ default: m.RequestLeavePage })));
const LeaveCalendarPage = lazy(() => import('@/modules/leave/pages/LeaveCalendarPage').then((m) => ({ default: m.LeaveCalendarPage })));
const TeamCalendarPage = lazy(() => import('@/modules/leave/pages/TeamCalendarPage').then((m) => ({ default: m.TeamCalendarPage })));
const LeaveBalancesPage = lazy(() => import('@/modules/leave/pages/LeaveBalancesPage').then((m) => ({ default: m.LeaveBalancesPage })));
const LeaveTypesPage = lazy(() => import('@/modules/leave/pages/LeaveTypesPage').then((m) => ({ default: m.LeaveTypesPage })));
const PublicHolidaysPage = lazy(() => import('@/modules/leave/pages/PublicHolidaysPage').then((m) => ({ default: m.PublicHolidaysPage })));
const ApprovalCenterPage = lazy(() => import('@/modules/leave/pages/ApprovalCenterPage').then((m) => ({ default: m.ApprovalCenterPage })));
const DelegationPage = lazy(() => import('@/modules/leave/pages/DelegationPage').then((m) => ({ default: m.DelegationPage })));
const LeaveAccrualPage = lazy(() => import('@/modules/leave/pages/LeaveAccrualPage').then((m) => ({ default: m.LeaveAccrualPage })));
const CarryOverPage = lazy(() => import('@/modules/leave/pages/CarryOverPage').then((m) => ({ default: m.CarryOverPage })));
const LeavePoliciesPage = lazy(() => import('@/modules/leave/pages/LeavePoliciesPage').then((m) => ({ default: m.LeavePoliciesPage })));
const LeaveHistoryPage = lazy(() => import('@/modules/leave/pages/LeaveHistoryPage').then((m) => ({ default: m.LeaveHistoryPage })));
const LeaveReportsPage = lazy(() => import('@/modules/leave/pages/LeaveReportsPage').then((m) => ({ default: m.LeaveReportsPage })));
const LeaveSettingsPage = lazy(() => import('@/modules/leave/pages/LeaveSettingsPage').then((m) => ({ default: m.LeaveSettingsPage })));

export const leaveRoutes: RouteObject[] = [
  { path: 'leave', element: <Navigate to="/leave/dashboard" replace /> },
  { path: 'leave/dashboard', element: wrap(<LeaveDashboardPage />) },
  { path: 'leave/my-leave', element: wrap(<MyLeavePage />) },
  { path: 'leave/requests', element: wrap(<LeaveRequestsPage />) },
  { path: 'leave/new', element: wrap(<RequestLeavePage />) },
  { path: 'leave/calendar', element: wrap(<LeaveCalendarPage />) },
  { path: 'leave/team-calendar', element: wrap(<TeamCalendarPage />) },
  { path: 'leave/balances', element: wrap(<LeaveBalancesPage />) },
  { path: 'leave/types', element: wrap(<LeaveTypesPage />) },
  { path: 'leave/holidays', element: wrap(<PublicHolidaysPage />) },
  { path: 'leave/approvals', element: wrap(<ApprovalCenterPage />) },
  { path: 'leave/delegation', element: wrap(<DelegationPage />) },
  { path: 'leave/accrual', element: wrap(<LeaveAccrualPage />) },
  { path: 'leave/carry-over', element: wrap(<CarryOverPage />) },
  { path: 'leave/policies', element: wrap(<LeavePoliciesPage />) },
  { path: 'leave/history', element: wrap(<LeaveHistoryPage />) },
  { path: 'leave/reports', element: wrap(<LeaveReportsPage />) },
  { path: 'leave/settings', element: wrap(<LeaveSettingsPage />) },
];
