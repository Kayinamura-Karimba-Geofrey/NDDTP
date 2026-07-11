import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { UserRole } from '@/types';

interface HasAccessProps {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: string[];
  fallback?: ReactNode;
}

export function HasAccess({ children, roles, permissions, fallback = null }: HasAccessProps) {
  const { hasRole, hasPermission } = usePermissions();

  const roleGranted = roles && roles.length > 0 ? hasRole(roles) : true;
  const permGranted = permissions && permissions.length > 0 ? hasPermission(permissions) : true;

  if (roleGranted && permGranted) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
