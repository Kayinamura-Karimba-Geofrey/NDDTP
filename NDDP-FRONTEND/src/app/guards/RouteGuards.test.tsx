import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import authReducer from '@/store/slices/auth-slice';
import { ROUTES } from '@/constants/app';
import type { AuthUser, UserRole } from '@/types';
import { ProtectedRoute, PublicRoute } from './RouteGuards';

function makeUser(roles: UserRole[], permissions: string[] = []): AuthUser {
  return {
    id: 'u1',
    email: 'user@example.com',
    firstName: 'Test',
    lastName: 'User',
    roles,
    permissions,
  };
}

function renderAt(path: string, user: AuthUser | null, element: React.ReactNode) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user,
        tokens: user ? { accessToken: 'a', refreshToken: 'r', expiresIn: 900 } : null,
        isAuthenticated: user !== null,
        isLoading: false,
        mfaRequired: false,
      },
    },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/private" element={element} />
          <Route path={ROUTES.LOGIN} element={<PublicRoute>login page</PublicRoute>} />
          <Route path={ROUTES.DASHBOARD} element={<div>dashboard</div>} />
          <Route path={ROUTES.FORBIDDEN} element={<div>forbidden</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects anonymous visitors to the login page instead of auto-logging them in', () => {
    renderAt('/private', null, <ProtectedRoute>secret</ProtectedRoute>);
    expect(screen.getByText('login page')).toBeInTheDocument();
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });

  it('renders children for an authenticated user', () => {
    renderAt('/private', makeUser(['VIEWER']), <ProtectedRoute>secret</ProtectedRoute>);
    expect(screen.getByText('secret')).toBeInTheDocument();
  });

  it('sends users without a required role to the forbidden page', () => {
    renderAt(
      '/private',
      makeUser(['VIEWER']),
      <ProtectedRoute roles={['ADMIN']}>secret</ProtectedRoute>,
    );
    expect(screen.getByText('forbidden')).toBeInTheDocument();
  });

  it('lets SUPER_ADMIN through role checks', () => {
    renderAt(
      '/private',
      makeUser(['SUPER_ADMIN']),
      <ProtectedRoute roles={['ADMIN']}>secret</ProtectedRoute>,
    );
    expect(screen.getByText('secret')).toBeInTheDocument();
  });

  it('enforces permissions, honouring the * wildcard', () => {
    renderAt(
      '/private',
      makeUser(['VIEWER'], ['audit:read']),
      <ProtectedRoute permissions={['users:write']}>secret</ProtectedRoute>,
    );
    expect(screen.getByText('forbidden')).toBeInTheDocument();
  });

  it('accepts a wildcard permission', () => {
    renderAt(
      '/private',
      makeUser(['VIEWER'], ['*']),
      <ProtectedRoute permissions={['users:write']}>secret</ProtectedRoute>,
    );
    expect(screen.getByText('secret')).toBeInTheDocument();
  });
});

describe('PublicRoute', () => {
  it('shows the login page to anonymous visitors', () => {
    renderAt(ROUTES.LOGIN, null, null);
    expect(screen.getByText('login page')).toBeInTheDocument();
  });

  it('redirects authenticated users to the dashboard', () => {
    renderAt(ROUTES.LOGIN, makeUser(['VIEWER']), null);
    expect(screen.getByText('dashboard')).toBeInTheDocument();
  });
});
