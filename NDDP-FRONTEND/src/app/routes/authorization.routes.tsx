import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AuthorizationDashboardPage = lazy(() => import('@/modules/authorization/pages/AuthorizationDashboardPage').then((m) => ({ default: m.AuthorizationDashboardPage })));
const RolesPage = lazy(() => import('@/modules/authorization/pages/RolesPage').then((m) => ({ default: m.RolesPage })));
const PermissionsPage = lazy(() => import('@/modules/authorization/pages/PermissionsPage').then((m) => ({ default: m.PermissionsPage })));
const PermissionGroupsPage = lazy(() => import('@/modules/authorization/pages/PermissionGroupsPage').then((m) => ({ default: m.PermissionGroupsPage })));
const RoleHierarchyPage = lazy(() => import('@/modules/authorization/pages/RoleHierarchyPage').then((m) => ({ default: m.RoleHierarchyPage })));
const UserRoleAssignmentsPage = lazy(() => import('@/modules/authorization/pages/UserRoleAssignmentsPage').then((m) => ({ default: m.UserRoleAssignmentsPage })));
const ResourcePermissionsPage = lazy(() => import('@/modules/authorization/pages/ResourcePermissionsPage').then((m) => ({ default: m.ResourcePermissionsPage })));
const MenuPermissionsPage = lazy(() => import('@/modules/authorization/pages/MenuPermissionsPage').then((m) => ({ default: m.MenuPermissionsPage })));
const ActionPermissionsPage = lazy(() => import('@/modules/authorization/pages/ActionPermissionsPage').then((m) => ({ default: m.ActionPermissionsPage })));
const ApprovalLevelsPage = lazy(() => import('@/modules/authorization/pages/ApprovalLevelsPage').then((m) => ({ default: m.ApprovalLevelsPage })));
const DelegatedAccessPage = lazy(() => import('@/modules/authorization/pages/DelegatedAccessPage').then((m) => ({ default: m.DelegatedAccessPage })));
const AccessPoliciesPage = lazy(() => import('@/modules/authorization/pages/AccessPoliciesPage').then((m) => ({ default: m.AccessPoliciesPage })));
const AccessRequestsPage = lazy(() => import('@/modules/authorization/pages/AccessRequestsPage').then((m) => ({ default: m.AccessRequestsPage })));
const TemporaryAccessPage = lazy(() => import('@/modules/authorization/pages/TemporaryAccessPage').then((m) => ({ default: m.TemporaryAccessPage })));
const PermissionAuditPage = lazy(() => import('@/modules/authorization/pages/PermissionAuditPage').then((m) => ({ default: m.PermissionAuditPage })));
const AuthorizationSettingsPage = lazy(() => import('@/modules/authorization/pages/AuthorizationSettingsPage').then((m) => ({ default: m.AuthorizationSettingsPage })));

export const authorizationRoutes: RouteObject[] = [
  { path: 'administration/authorization', element: wrap(<AuthorizationDashboardPage />) },
  { path: 'administration/roles', element: wrap(<RolesPage />) },
  { path: 'administration/permissions', element: wrap(<PermissionsPage />) },
  { path: 'administration/permission-groups', element: wrap(<PermissionGroupsPage />) },
  { path: 'administration/role-hierarchy', element: wrap(<RoleHierarchyPage />) },
  { path: 'administration/assignments', element: wrap(<UserRoleAssignmentsPage />) },
  { path: 'administration/resource-permissions', element: wrap(<ResourcePermissionsPage />) },
  { path: 'administration/menu-permissions', element: wrap(<MenuPermissionsPage />) },
  { path: 'administration/action-permissions', element: wrap(<ActionPermissionsPage />) },
  { path: 'administration/approval-levels', element: wrap(<ApprovalLevelsPage />) },
  { path: 'administration/delegated-access', element: wrap(<DelegatedAccessPage />) },
  { path: 'administration/access-policies', element: wrap(<AccessPoliciesPage />) },
  { path: 'administration/access-requests', element: wrap(<AccessRequestsPage />) },
  { path: 'administration/temporary-access', element: wrap(<TemporaryAccessPage />) },
  { path: 'administration/permission-audit', element: wrap(<PermissionAuditPage />) },
  { path: 'administration/authorization-settings', element: wrap(<AuthorizationSettingsPage />) },
];
