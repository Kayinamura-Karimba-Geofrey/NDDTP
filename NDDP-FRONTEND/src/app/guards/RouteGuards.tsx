import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsAuthenticated, setCredentials } from '@/store/slices/auth-slice';
import { ROUTES } from '@/constants/app';
import { PageLoader } from '@/components/ui';
import { authApi } from '@/modules/authentication/api/auth.api';
import { DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD } from '@/constants/seed-credentials';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [login] = authApi.useLoginMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      let active = true;
      const autoLogin = async () => {
        try {
          const result = await login({
            email: DEFAULT_LOGIN_EMAIL,
            password: DEFAULT_LOGIN_PASSWORD,
            rememberMe: true,
          }).unwrap();
          if (active && result.user && result.tokens) {
            dispatch(
              setCredentials({
                user: result.user,
                tokens: result.tokens,
                remember: true,
              }),
            );
          }
        } catch (error) {
          console.error('Silent auto-login failed:', error);
        } finally {
          if (active) {
            setIsLoggingIn(false);
          }
        }
      };
      autoLogin();
      return () => {
        active = false;
      };
    }
  }, [isAuthenticated, login, dispatch]);

  if (isLoggingIn || !isAuthenticated) {
    return <PageLoader />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children: _children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [login] = authApi.useLoginMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      let active = true;
      const autoLogin = async () => {
        try {
          const result = await login({
            email: DEFAULT_LOGIN_EMAIL,
            password: DEFAULT_LOGIN_PASSWORD,
            rememberMe: true,
          }).unwrap();
          if (active && result.user && result.tokens) {
            dispatch(
              setCredentials({
                user: result.user,
                tokens: result.tokens,
                remember: true,
              }),
            );
          }
        } catch (error) {
          console.error('Silent auto-login in PublicRoute failed:', error);
        } finally {
          if (active) {
            setIsLoggingIn(false);
          }
        }
      };
      autoLogin();
      return () => {
        active = false;
      };
    }
  }, [isAuthenticated, login, dispatch]);

  if (isLoggingIn || !isAuthenticated) {
    return <PageLoader />;
  }

  return <Navigate to={ROUTES.DASHBOARD} replace />;
}

export function SuspenseFallback() {
  return <PageLoader />;
}

