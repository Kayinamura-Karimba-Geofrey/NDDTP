import { useAppSelector } from '@/store';
import { selectPermissions, selectRoles } from '@/store/slices/auth-slice';
import type { NavItem, UserRole } from '@/types';

function permissionMatches(userPerms: string[], required: string): boolean {
  if (userPerms.includes('*') || userPerms.includes(required)) return true;

  const [domain, action] = required.split(':');
  if (domain && action) {
    return userPerms.some(
      (p) => p.startsWith(`${domain}:${action}:`) || p === `${domain}:${action}`,
    );
  }

  const dotForm = required.replace(/:/g, '.');
  return userPerms.some((p) => p.replace(/:/g, '.') === dotForm);
}

export function usePermissions() {
  const permissions = useAppSelector(selectPermissions);
  const roles = useAppSelector(selectRoles);

  const hasPermission = (permission?: string | string[]): boolean => {
    if (!permission) return true;
    if (roles.includes('SUPER_ADMIN' as UserRole)) return true;
    const required = Array.isArray(permission) ? permission : [permission];
    return required.some((p) => permissionMatches(permissions, p));
  };

  const hasRole = (role?: UserRole | UserRole[]): boolean => {
    if (!role) return true;
    const required = Array.isArray(role) ? role : [role];
    return required.some((r) => roles.includes(r));
  };

  const canAccess = (item: Pick<NavItem, 'permissions' | 'roles'>): boolean =>
    hasRole(item.roles) && hasPermission(item.permissions);

  const filterNavItems = (items: NavItem[]): NavItem[] =>
    items
      .filter(canAccess)
      .map((item) => ({
        ...item,
        children: item.children ? filterNavItems(item.children) : undefined,
      }))
      .filter((item) => !item.children || item.children.length > 0);

  return { hasPermission, hasRole, canAccess, filterNavItems, permissions, roles };
}
