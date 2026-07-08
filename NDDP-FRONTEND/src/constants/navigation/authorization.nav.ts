import type { NavItem } from '@/types';

export const authorizationNav: NavItem = {
    id: 'authorization',
    label: 'Authorization',
    path: '/administration/authorization',
    icon: 'FiShield',
    module: 'authorization',
    roles: ['SUPER_ADMIN', 'ADMIN'],
    children: [
      { id: 'authz-dashboard', label: 'Dashboard', path: '/administration/authorization', icon: 'FiGrid', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'roles', label: 'Roles', path: '/administration/roles', icon: 'FiShield', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'permissions', label: 'Permissions', path: '/administration/permissions', icon: 'FiKey', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'permission-groups', label: 'Permission Groups', path: '/administration/permission-groups', icon: 'FiLayers', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'role-hierarchy', label: 'Role Hierarchy', path: '/administration/role-hierarchy', icon: 'FiGitBranch', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'assignments', label: 'User Assignments', path: '/administration/assignments', icon: 'FiUsers', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'resource-perms', label: 'Resource Permissions', path: '/administration/resource-permissions', icon: 'FiBox', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'menu-perms', label: 'Menu Permissions', path: '/administration/menu-permissions', icon: 'FiMenu', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'action-perms', label: 'Action Permissions', path: '/administration/action-permissions', icon: 'FiZap', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'approval-levels', label: 'Approval Levels', path: '/administration/approval-levels', icon: 'FiCheckCircle', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'delegated-access', label: 'Delegated Access', path: '/administration/delegated-access', icon: 'FiShare2', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'access-policies', label: 'Access Policies', path: '/administration/access-policies', icon: 'FiFileText', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'access-requests', label: 'Access Requests', path: '/administration/access-requests', icon: 'FiInbox', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'temporary-access', label: 'Temporary Access', path: '/administration/temporary-access', icon: 'FiClock', module: 'authorization', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'permission-audit', label: 'Permission Audit', path: '/administration/permission-audit', icon: 'FiClipboard', module: 'authorization', roles: ['SUPER_ADMIN'] },
      { id: 'authz-settings', label: 'Auth Settings', path: '/administration/authorization-settings', icon: 'FiSliders', module: 'authorization', roles: ['SUPER_ADMIN'] },
    ],
  };
