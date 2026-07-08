import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const FinanceDashboardPage = lazy(() => import('@/modules/finance/pages/FinanceDashboardPage').then((m) => ({ default: m.FinanceDashboardPage })));
const FiscalYearsPage = lazy(() => import('@/modules/finance/pages/FiscalYearsPage').then((m) => ({ default: m.FiscalYearsPage })));
const BudgetPlanningPage = lazy(() => import('@/modules/finance/pages/BudgetPlanningPage').then((m) => ({ default: m.BudgetPlanningPage })));
const BudgetAllocationPage = lazy(() => import('@/modules/finance/pages/BudgetAllocationPage').then((m) => ({ default: m.BudgetAllocationPage })));
const BudgetTransfersPage = lazy(() => import('@/modules/finance/pages/BudgetTransfersPage').then((m) => ({ default: m.BudgetTransfersPage })));
const BudgetMonitoringPage = lazy(() => import('@/modules/finance/pages/BudgetMonitoringPage').then((m) => ({ default: m.BudgetMonitoringPage })));
const CostCentersPage = lazy(() => import('@/modules/finance/pages/CostCentersPage').then((m) => ({ default: m.CostCentersPage })));
const ProgramsProjectsPage = lazy(() => import('@/modules/finance/pages/ProgramsProjectsPage').then((m) => ({ default: m.ProgramsProjectsPage })));
const CommitmentsPage = lazy(() => import('@/modules/finance/pages/CommitmentsPage').then((m) => ({ default: m.CommitmentsPage })));
const ExpenditureManagementPage = lazy(() => import('@/modules/finance/pages/ExpenditureManagementPage').then((m) => ({ default: m.ExpenditureManagementPage })));
const InvoiceManagementPage = lazy(() => import('@/modules/finance/pages/InvoiceManagementPage').then((m) => ({ default: m.InvoiceManagementPage })));
const PaymentManagementPage = lazy(() => import('@/modules/finance/pages/PaymentManagementPage').then((m) => ({ default: m.PaymentManagementPage })));
const AccountsPayablePage = lazy(() => import('@/modules/finance/pages/AccountsPayablePage').then((m) => ({ default: m.AccountsPayablePage })));
const AccountsReceivablePage = lazy(() => import('@/modules/finance/pages/AccountsReceivablePage').then((m) => ({ default: m.AccountsReceivablePage })));
const RevenueManagementPage = lazy(() => import('@/modules/finance/pages/RevenueManagementPage').then((m) => ({ default: m.RevenueManagementPage })));
const FinanceApprovalCenterPage = lazy(() => import('@/modules/finance/pages/FinanceApprovalCenterPage').then((m) => ({ default: m.FinanceApprovalCenterPage })));
const FinanceCalendarPage = lazy(() => import('@/modules/finance/pages/FinanceCalendarPage').then((m) => ({ default: m.FinanceCalendarPage })));
const FinanceReportsPage = lazy(() => import('@/modules/finance/pages/FinanceReportsPage').then((m) => ({ default: m.FinanceReportsPage })));
const FinanceSettingsPage = lazy(() => import('@/modules/finance/pages/FinanceSettingsPage').then((m) => ({ default: m.FinanceSettingsPage })));
const FinanceAuditPage = lazy(() => import('@/modules/finance/pages/FinanceAuditPage').then((m) => ({ default: m.FinanceAuditPage })));

export const financeRoutes: RouteObject[] = [
  { path: 'finance', element: <Navigate to="/finance/dashboard" replace /> },
  { path: 'finance/dashboard', element: wrap(<FinanceDashboardPage />) },
  { path: 'finance/fiscal-years', element: wrap(<FiscalYearsPage />) },
  { path: 'finance/budget-planning', element: wrap(<BudgetPlanningPage />) },
  { path: 'finance/budget-allocation', element: wrap(<BudgetAllocationPage />) },
  { path: 'finance/budget-transfers', element: wrap(<BudgetTransfersPage />) },
  { path: 'finance/budget-monitoring', element: wrap(<BudgetMonitoringPage />) },
  { path: 'finance/cost-centers', element: wrap(<CostCentersPage />) },
  { path: 'finance/programs', element: wrap(<ProgramsProjectsPage />) },
  { path: 'finance/commitments', element: wrap(<CommitmentsPage />) },
  { path: 'finance/expenditures', element: wrap(<ExpenditureManagementPage />) },
  { path: 'finance/invoices', element: wrap(<InvoiceManagementPage />) },
  { path: 'finance/payments', element: wrap(<PaymentManagementPage />) },
  { path: 'finance/accounts-payable', element: wrap(<AccountsPayablePage />) },
  { path: 'finance/accounts-receivable', element: wrap(<AccountsReceivablePage />) },
  { path: 'finance/revenue', element: wrap(<RevenueManagementPage />) },
  { path: 'finance/approvals', element: wrap(<FinanceApprovalCenterPage />) },
  { path: 'finance/calendar', element: wrap(<FinanceCalendarPage />) },
  { path: 'finance/reports', element: wrap(<FinanceReportsPage />) },
  { path: 'finance/settings', element: wrap(<FinanceSettingsPage />) },
  { path: 'finance/audit', element: wrap(<FinanceAuditPage />) },
];
