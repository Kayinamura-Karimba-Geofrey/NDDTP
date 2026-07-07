import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/app/guards/RouteGuards';
import { ROUTES } from '@/constants/app';

const LoginPage = lazy(() => import('@/modules/authentication/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const OtpPage = lazy(() => import('@/modules/authentication/pages/OtpPage').then((m) => ({ default: m.OtpPage })));
const SessionExpiredPage = lazy(() => import('@/modules/authentication/pages/AuthStatusPages').then((m) => ({ default: m.SessionExpiredPage })));
const ResetPasswordPage = lazy(() => import('@/modules/authentication/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const AccountLockedPage = lazy(() => import('@/modules/authentication/pages/AccountLockedPage').then((m) => ({ default: m.AccountLockedPage })));
const ChangePasswordPage = lazy(() => import('@/modules/authentication/pages/ChangePasswordPage').then((m) => ({ default: m.ChangePasswordPage })));
const SessionManagementPage = lazy(() => import('@/modules/authentication/pages/SessionManagementPage').then((m) => ({ default: m.SessionManagementPage })));
const LoginHistoryPage = lazy(() => import('@/modules/authentication/pages/LoginHistoryPage').then((m) => ({ default: m.LoginHistoryPage })));
const SecuritySettingsPage = lazy(() => import('@/modules/authentication/pages/SecuritySettingsPage').then((m) => ({ default: m.SecuritySettingsPage })));
const DeviceManagementPage = lazy(() => import('@/modules/authentication/pages/DeviceManagementPage').then((m) => ({ default: m.DeviceManagementPage })));
const UnauthorizedPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.UnauthorizedPage })));
const ForbiddenPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ForbiddenPage })));
const NotFoundPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.NotFoundPage })));
const ServerErrorPage = lazy(() => import('@/modules/authentication/pages/ErrorPages').then((m) => ({ default: m.ServerErrorPage })));
const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const CloudOverviewPage = lazy(() => import('@/modules/cloud/pages/CloudOverviewPage').then((m) => ({ default: m.CloudOverviewPage })));
const CloudServicesPage = lazy(() => import('@/modules/cloud/pages/CloudServicesPage').then((m) => ({ default: m.CloudServicesPage })));
const CloudEnvironmentsPage = lazy(() => import('@/modules/cloud/pages/CloudEnvironmentsPage').then((m) => ({ default: m.CloudEnvironmentsPage })));
const CloudGatewayPage = lazy(() => import('@/modules/cloud/pages/CloudGatewayPage').then((m) => ({ default: m.CloudGatewayPage })));
const CloudDeploymentsPage = lazy(() => import('@/modules/cloud/pages/CloudDeploymentsPage').then((m) => ({ default: m.CloudDeploymentsPage })));
const ServiceListPage = lazy(() => import('@/components/shared/ServiceListPage').then((m) => ({ default: m.ServiceListPage })));
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
const UsersDashboardPage = lazy(() => import('@/modules/users/pages/UsersDashboardPage').then((m) => ({ default: m.UsersDashboardPage })));
const UsersListPage = lazy(() => import('@/modules/users/pages/UsersListPage').then((m) => ({ default: m.UsersListPage })));
const CreateUserPage = lazy(() => import('@/modules/users/pages/CreateUserPage').then((m) => ({ default: m.CreateUserPage })));
const UserDetailsPage = lazy(() => import('@/modules/users/pages/UserDetailsPage').then((m) => ({ default: m.UserDetailsPage })));
const EditUserPage = lazy(() => import('@/modules/users/pages/EditUserPage').then((m) => ({ default: m.EditUserPage })));
const OrganizationalAssignmentsPage = lazy(() => import('@/modules/users/pages/OrganizationalAssignmentsPage').then((m) => ({ default: m.OrganizationalAssignmentsPage })));
const UserStatusPage = lazy(() => import('@/modules/users/pages/UserStatusPage').then((m) => ({ default: m.UserStatusPage })));
const DepartmentsPage = lazy(() => import('@/modules/users/pages/DepartmentsPage').then((m) => ({ default: m.DepartmentsPage })));
const PositionsPage = lazy(() => import('@/modules/users/pages/PositionsPage').then((m) => ({ default: m.PositionsPage })));
const ProfileDocumentsPage = lazy(() => import('@/modules/users/pages/ProfileDocumentsPage').then((m) => ({ default: m.ProfileDocumentsPage })));
const UserPreferencesPage = lazy(() => import('@/modules/users/pages/UserPreferencesPage').then((m) => ({ default: m.UserPreferencesPage })));
const ImportUsersPage = lazy(() => import('@/modules/users/pages/ImportUsersPage').then((m) => ({ default: m.ImportUsersPage })));
const ExportUsersPage = lazy(() => import('@/modules/users/pages/ExportUsersPage').then((m) => ({ default: m.ExportUsersPage })));
const UserHistoryPage = lazy(() => import('@/modules/users/pages/UserHistoryPage').then((m) => ({ default: m.UserHistoryPage })));
const UserSettingsPage = lazy(() => import('@/modules/users/pages/UserSettingsPage').then((m) => ({ default: m.UserSettingsPage })));
const PersonnelDashboardPage = lazy(() => import('@/modules/personnel/pages/PersonnelDashboardPage').then((m) => ({ default: m.PersonnelDashboardPage })));
const PersonnelDirectoryPage = lazy(() => import('@/modules/personnel/pages/PersonnelDirectoryPage').then((m) => ({ default: m.PersonnelDirectoryPage })));
const PersonnelProfilePage = lazy(() => import('@/modules/personnel/pages/PersonnelProfilePage').then((m) => ({ default: m.PersonnelProfilePage })));
const RegisterPersonnelPage = lazy(() => import('@/modules/personnel/pages/RegisterPersonnelPage').then((m) => ({ default: m.RegisterPersonnelPage })));
const EditPersonnelPage = lazy(() => import('@/modules/personnel/pages/EditPersonnelPage').then((m) => ({ default: m.EditPersonnelPage })));
const OrganizationStructurePage = lazy(() => import('@/modules/personnel/pages/OrganizationStructurePage').then((m) => ({ default: m.OrganizationStructurePage })));
const PersonnelDepartmentsPage = lazy(() => import('@/modules/personnel/pages/PersonnelDepartmentsPage').then((m) => ({ default: m.PersonnelDepartmentsPage })));
const UnitsPage = lazy(() => import('@/modules/personnel/pages/UnitsPage').then((m) => ({ default: m.UnitsPage })));
const PersonnelPositionsPage = lazy(() => import('@/modules/personnel/pages/PersonnelPositionsPage').then((m) => ({ default: m.PersonnelPositionsPage })));
const EmploymentHistoryPage = lazy(() => import('@/modules/personnel/pages/EmploymentHistoryPage').then((m) => ({ default: m.EmploymentHistoryPage })));
const TransfersPage = lazy(() => import('@/modules/personnel/pages/TransfersPage').then((m) => ({ default: m.TransfersPage })));
const PromotionsPage = lazy(() => import('@/modules/personnel/pages/PromotionsPage').then((m) => ({ default: m.PromotionsPage })));
const QualificationsPage = lazy(() => import('@/modules/personnel/pages/QualificationsPage').then((m) => ({ default: m.QualificationsPage })));
const CertificationsPage = lazy(() => import('@/modules/personnel/pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })));
const SkillsPage = lazy(() => import('@/modules/personnel/pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const AwardsPage = lazy(() => import('@/modules/personnel/pages/AwardsPage').then((m) => ({ default: m.AwardsPage })));
const PersonnelDocumentsPage = lazy(() => import('@/modules/personnel/pages/PersonnelDocumentsPage').then((m) => ({ default: m.PersonnelDocumentsPage })));
const EmergencyContactsPage = lazy(() => import('@/modules/personnel/pages/EmergencyContactsPage').then((m) => ({ default: m.EmergencyContactsPage })));
const DependentsPage = lazy(() => import('@/modules/personnel/pages/DependentsPage').then((m) => ({ default: m.DependentsPage })));
const EmploymentStatusPage = lazy(() => import('@/modules/personnel/pages/EmploymentStatusPage').then((m) => ({ default: m.EmploymentStatusPage })));
const RetirementPlanningPage = lazy(() => import('@/modules/personnel/pages/RetirementPlanningPage').then((m) => ({ default: m.RetirementPlanningPage })));
const SeparationRecordsPage = lazy(() => import('@/modules/personnel/pages/SeparationRecordsPage').then((m) => ({ default: m.SeparationRecordsPage })));
const BulkImportPage = lazy(() => import('@/modules/personnel/pages/BulkImportPage').then((m) => ({ default: m.BulkImportPage })));
const BulkExportPage = lazy(() => import('@/modules/personnel/pages/BulkExportPage').then((m) => ({ default: m.BulkExportPage })));
const PersonnelReportsPage = lazy(() => import('@/modules/personnel/pages/PersonnelReportsPage').then((m) => ({ default: m.PersonnelReportsPage })));

const wrap = (element: React.ReactNode) => (
  <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
);

const moduleRoute = (path: string, moduleKey: string): RouteObject => ({
  path,
  element: wrap(<ServiceListPage moduleKey={moduleKey} />),
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
      { path: 'dashboard', element: wrap(<DashboardPage />) },
      { path: 'auth/change-password', element: wrap(<ChangePasswordPage />) },
      { path: 'auth/sessions', element: wrap(<SessionManagementPage />) },
      { path: 'auth/login-history', element: wrap(<LoginHistoryPage />) },
      { path: 'auth/security', element: wrap(<SecuritySettingsPage />) },
      { path: 'auth/devices', element: wrap(<DeviceManagementPage />) },
      { path: 'cloud', element: wrap(<CloudOverviewPage />) },
      { path: 'cloud/services', element: wrap(<CloudServicesPage />) },
      { path: 'cloud/environments', element: wrap(<CloudEnvironmentsPage />) },
      { path: 'cloud/gateway', element: wrap(<CloudGatewayPage />) },
      { path: 'cloud/deployments', element: wrap(<CloudDeploymentsPage />) },
      moduleRoute('profile', 'user'),
      { path: 'users', element: <Navigate to="/users/dashboard" replace /> },
      { path: 'users/dashboard', element: wrap(<UsersDashboardPage />) },
      { path: 'users/list', element: wrap(<UsersListPage />) },
      { path: 'users/new', element: wrap(<CreateUserPage />) },
      { path: 'users/departments', element: wrap(<DepartmentsPage />) },
      { path: 'users/positions', element: wrap(<PositionsPage />) },
      { path: 'users/organization', element: wrap(<OrganizationalAssignmentsPage />) },
      { path: 'users/status', element: wrap(<UserStatusPage />) },
      { path: 'users/documents', element: wrap(<ProfileDocumentsPage />) },
      { path: 'users/preferences', element: wrap(<UserPreferencesPage />) },
      { path: 'users/import', element: wrap(<ImportUsersPage />) },
      { path: 'users/export', element: wrap(<ExportUsersPage />) },
      { path: 'users/history', element: wrap(<UserHistoryPage />) },
      { path: 'users/settings', element: wrap(<UserSettingsPage />) },
      { path: 'users/:id/edit', element: wrap(<EditUserPage />) },
      { path: 'users/:id', element: wrap(<UserDetailsPage />) },
      { path: 'personnel', element: <Navigate to="/personnel/dashboard" replace /> },
      { path: 'personnel/dashboard', element: wrap(<PersonnelDashboardPage />) },
      { path: 'personnel/directory', element: wrap(<PersonnelDirectoryPage />) },
      { path: 'personnel/new', element: wrap(<RegisterPersonnelPage />) },
      { path: 'personnel/organization', element: wrap(<OrganizationStructurePage />) },
      { path: 'personnel/departments', element: wrap(<PersonnelDepartmentsPage />) },
      { path: 'personnel/units', element: wrap(<UnitsPage />) },
      { path: 'personnel/positions', element: wrap(<PersonnelPositionsPage />) },
      { path: 'personnel/employment-history', element: wrap(<EmploymentHistoryPage />) },
      { path: 'personnel/transfers', element: wrap(<TransfersPage />) },
      { path: 'personnel/promotions', element: wrap(<PromotionsPage />) },
      { path: 'personnel/qualifications', element: wrap(<QualificationsPage />) },
      { path: 'personnel/certifications', element: wrap(<CertificationsPage />) },
      { path: 'personnel/skills', element: wrap(<SkillsPage />) },
      { path: 'personnel/awards', element: wrap(<AwardsPage />) },
      { path: 'personnel/documents', element: wrap(<PersonnelDocumentsPage />) },
      { path: 'personnel/emergency-contacts', element: wrap(<EmergencyContactsPage />) },
      { path: 'personnel/dependents', element: wrap(<DependentsPage />) },
      { path: 'personnel/employment-status', element: wrap(<EmploymentStatusPage />) },
      { path: 'personnel/retirement', element: wrap(<RetirementPlanningPage />) },
      { path: 'personnel/separation', element: wrap(<SeparationRecordsPage />) },
      { path: 'personnel/import', element: wrap(<BulkImportPage />) },
      { path: 'personnel/export', element: wrap(<BulkExportPage />) },
      { path: 'personnel/reports', element: wrap(<PersonnelReportsPage />) },
      { path: 'personnel/:id/edit', element: wrap(<EditPersonnelPage />) },
      { path: 'personnel/:id', element: wrap(<PersonnelProfilePage />) },
      moduleRoute('recruitment/*', 'recruitment'),
      moduleRoute('leave/*', 'leave'),
      moduleRoute('welfare/*', 'welfare'),
      moduleRoute('medical/*', 'medical'),
      moduleRoute('training/*', 'training'),
      moduleRoute('performance/*', 'performance'),
      moduleRoute('assets/*', 'asset'),
      moduleRoute('inventory/*', 'inventory'),
      moduleRoute('logistics/*', 'logistics'),
      moduleRoute('procurement/*', 'procurement'),
      moduleRoute('fleet/*', 'fleet'),
      moduleRoute('maintenance/*', 'maintenance'),
      moduleRoute('facilities/*', 'facilities'),
      moduleRoute('finance/*', 'finance'),
      moduleRoute('visitors/*', 'visitor'),
      moduleRoute('workflow/*', 'workflow'),
      moduleRoute('calendar/*', 'calendar'),
      moduleRoute('reports/*', 'reporting'),
      moduleRoute('analytics/*', 'analytics'),
      moduleRoute('business-intelligence/*', 'business-intelligence'),
      moduleRoute('notifications/*', 'notification'),
      moduleRoute('messaging/*', 'messaging'),
      moduleRoute('search/*', 'search'),
      moduleRoute('ai-assistant/*', 'ai-assistant'),
      moduleRoute('settings/*', 'settings'),
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
      moduleRoute('administration/*', 'configuration'),
      moduleRoute('audit-logs/*', 'audit'),
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
