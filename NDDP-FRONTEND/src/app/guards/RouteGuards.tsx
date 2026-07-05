import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { selectIsAuthenticated } from '@/store/slices/auth-slice';
import { ROUTES } from '@/constants/app';
import { PageLoader } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function ProtectedRoute({ children, permissions, roles }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (roles?.length && user && !roles.some((r) => user.roles.includes(r as never)) && !user.roles.includes('SUPER_ADMIN')) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  if (permissions?.length && user && !permissions.some((p) => user.permissions.includes(p) || user.permissions.includes('*'))) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <>{children}</>;
}

export function SuspenseFallback() {
  return <PageLoader />;
}
