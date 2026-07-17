import type { NavItem, UserRole } from '@/types';

export function usePermissions() {
  const permissions = ['*'];
  const roles = ['SUPER_ADMIN' as UserRole];

  const hasPermission = (_permission?: string | string[]): boolean => {
    return true;
  };

  const hasRole = (_role?: UserRole | UserRole[]): boolean => {
    return true;
  };

  const canAccess = (_item?: Pick<NavItem, 'permissions' | 'roles'>): boolean => {
    return true;
  };

  const filterNavItems = (items: NavItem[]): NavItem[] =>
    items.map((item) => ({
      ...item,
      children: item.children ? filterNavItems(item.children) : undefined,
    }));

  return { hasPermission, hasRole, canAccess, filterNavItems, permissions, roles };
}
