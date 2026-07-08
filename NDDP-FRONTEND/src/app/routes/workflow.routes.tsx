import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const WorkflowDashboardPage = lazy(() => import('@/modules/workflow/pages/WorkflowDashboardPage').then((m) => ({ default: m.WorkflowDashboardPage })));
const WorkflowTemplatesPage = lazy(() => import('@/modules/workflow/pages/WorkflowTemplatesPage').then((m) => ({ default: m.WorkflowTemplatesPage })));
const WorkflowDesignerPage = lazy(() => import('@/modules/workflow/pages/WorkflowDesignerPage').then((m) => ({ default: m.WorkflowDesignerPage })));
const BusinessRulesPage = lazy(() => import('@/modules/workflow/pages/BusinessRulesPage').then((m) => ({ default: m.BusinessRulesPage })));
const ApprovalChainsPage = lazy(() => import('@/modules/workflow/pages/ApprovalChainsPage').then((m) => ({ default: m.ApprovalChainsPage })));
const RunningWorkflowsPage = lazy(() => import('@/modules/workflow/pages/RunningWorkflowsPage').then((m) => ({ default: m.RunningWorkflowsPage })));
const PendingTasksPage = lazy(() => import('@/modules/workflow/pages/PendingTasksPage').then((m) => ({ default: m.PendingTasksPage })));
const MyApprovalsPage = lazy(() => import('@/modules/workflow/pages/MyApprovalsPage').then((m) => ({ default: m.MyApprovalsPage })));
const DelegationManagementPage = lazy(() => import('@/modules/workflow/pages/DelegationManagementPage').then((m) => ({ default: m.DelegationManagementPage })));
const EscalationManagementPage = lazy(() => import('@/modules/workflow/pages/EscalationManagementPage').then((m) => ({ default: m.EscalationManagementPage })));
const SlaManagementPage = lazy(() => import('@/modules/workflow/pages/SlaManagementPage').then((m) => ({ default: m.SlaManagementPage })));
const AutomationRulesPage = lazy(() => import('@/modules/workflow/pages/AutomationRulesPage').then((m) => ({ default: m.AutomationRulesPage })));
const WorkflowNotificationsPage = lazy(() => import('@/modules/workflow/pages/WorkflowNotificationsPage').then((m) => ({ default: m.WorkflowNotificationsPage })));
const ProcessHistoryPage = lazy(() => import('@/modules/workflow/pages/ProcessHistoryPage').then((m) => ({ default: m.ProcessHistoryPage })));
const WorkflowAnalyticsPage = lazy(() => import('@/modules/workflow/pages/WorkflowAnalyticsPage').then((m) => ({ default: m.WorkflowAnalyticsPage })));
const WorkflowReportsPage = lazy(() => import('@/modules/workflow/pages/WorkflowReportsPage').then((m) => ({ default: m.WorkflowReportsPage })));
const ApiIntegrationsPage = lazy(() => import('@/modules/workflow/pages/ApiIntegrationsPage').then((m) => ({ default: m.ApiIntegrationsPage })));
const WorkflowSettingsPage = lazy(() => import('@/modules/workflow/pages/WorkflowSettingsPage').then((m) => ({ default: m.WorkflowSettingsPage })));

export const workflowRoutes: RouteObject[] = [
  { path: 'workflow', element: <Navigate to="/workflow/dashboard" replace /> },
  { path: 'workflow/dashboard', element: wrap(<WorkflowDashboardPage />) },
  { path: 'workflow/templates', element: wrap(<WorkflowTemplatesPage />) },
  { path: 'workflow/designer', element: wrap(<WorkflowDesignerPage />) },
  { path: 'workflow/rules', element: wrap(<BusinessRulesPage />) },
  { path: 'workflow/approval-chains', element: wrap(<ApprovalChainsPage />) },
  { path: 'workflow/running', element: wrap(<RunningWorkflowsPage />) },
  { path: 'workflow/tasks', element: wrap(<PendingTasksPage />) },
  { path: 'workflow/my-approvals', element: wrap(<MyApprovalsPage />) },
  { path: 'workflow/delegation', element: wrap(<DelegationManagementPage />) },
  { path: 'workflow/escalation', element: wrap(<EscalationManagementPage />) },
  { path: 'workflow/sla', element: wrap(<SlaManagementPage />) },
  { path: 'workflow/automation', element: wrap(<AutomationRulesPage />) },
  { path: 'workflow/notifications', element: wrap(<WorkflowNotificationsPage />) },
  { path: 'workflow/history', element: wrap(<ProcessHistoryPage />) },
  { path: 'workflow/analytics', element: wrap(<WorkflowAnalyticsPage />) },
  { path: 'workflow/reports', element: wrap(<WorkflowReportsPage />) },
  { path: 'workflow/integrations', element: wrap(<ApiIntegrationsPage />) },
  { path: 'workflow/settings', element: wrap(<WorkflowSettingsPage />) },
];
