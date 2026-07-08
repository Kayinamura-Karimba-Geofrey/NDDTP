import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const UsersDashboardPage = lazy(() => import('@/modules/users/pages/UsersDashboardPage').then((m) => ({ default: m.UsersDashboardPage })));
const UsersListPage = lazy(() => import('@/modules/users/pages/UsersListPage').then((m) => ({ default: m.UsersListPage })));
const CreateUserPage = lazy(() => import('@/modules/users/pages/CreateUserPage').then((m) => ({ default: m.CreateUserPage })));
const DepartmentsPage = lazy(() => import('@/modules/users/pages/DepartmentsPage').then((m) => ({ default: m.DepartmentsPage })));
const PositionsPage = lazy(() => import('@/modules/users/pages/PositionsPage').then((m) => ({ default: m.PositionsPage })));
const OrganizationalAssignmentsPage = lazy(() => import('@/modules/users/pages/OrganizationalAssignmentsPage').then((m) => ({ default: m.OrganizationalAssignmentsPage })));
const UserStatusPage = lazy(() => import('@/modules/users/pages/UserStatusPage').then((m) => ({ default: m.UserStatusPage })));
const ProfileDocumentsPage = lazy(() => import('@/modules/users/pages/ProfileDocumentsPage').then((m) => ({ default: m.ProfileDocumentsPage })));
const ImportUsersPage = lazy(() => import('@/modules/users/pages/ImportUsersPage').then((m) => ({ default: m.ImportUsersPage })));
const ExportUsersPage = lazy(() => import('@/modules/users/pages/ExportUsersPage').then((m) => ({ default: m.ExportUsersPage })));
const UserHistoryPage = lazy(() => import('@/modules/users/pages/UserHistoryPage').then((m) => ({ default: m.UserHistoryPage })));
const UserSettingsPage = lazy(() => import('@/modules/users/pages/UserSettingsPage').then((m) => ({ default: m.UserSettingsPage })));
const EditUserPage = lazy(() => import('@/modules/users/pages/EditUserPage').then((m) => ({ default: m.EditUserPage })));
const UserDetailsPage = lazy(() => import('@/modules/users/pages/UserDetailsPage').then((m) => ({ default: m.UserDetailsPage })));

export const usersRoutes: RouteObject[] = [
  { path: 'users', element: <Navigate to="/users/dashboard" replace /> },
  { path: 'users/dashboard', element: wrap(<UsersDashboardPage />) },
  { path: 'users/list', element: wrap(<UsersListPage />) },
  { path: 'users/new', element: wrap(<CreateUserPage />) },
  { path: 'users/departments', element: wrap(<DepartmentsPage />) },
  { path: 'users/positions', element: wrap(<PositionsPage />) },
  { path: 'users/organization', element: wrap(<OrganizationalAssignmentsPage />) },
  { path: 'users/status', element: wrap(<UserStatusPage />) },
  { path: 'users/documents', element: wrap(<ProfileDocumentsPage />) },
  /** Legacy self-prefs path → My Profile preferences hub */
  { path: 'users/preferences', element: <Navigate to="/profile/preferences" replace /> },
  { path: 'users/import', element: wrap(<ImportUsersPage />) },
  { path: 'users/export', element: wrap(<ExportUsersPage />) },
  { path: 'users/history', element: wrap(<UserHistoryPage />) },
  { path: 'users/settings', element: wrap(<UserSettingsPage />) },
  { path: 'users/:id/edit', element: wrap(<EditUserPage />) },
  { path: 'users/:id', element: wrap(<UserDetailsPage />) },
];
