import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock, FiMoon, FiSun, FiGlobe } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCredentials, setMfaRequired } from '@/store/slices/auth-slice';
import { setTheme } from '@/store/slices/theme-slice';
import { useLoginMutation } from '../api/auth.api';
import { loginSchema, type LoginFormData } from '../schemas/auth.schemas';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { PasswordField } from '../components/PasswordField';
import { Button, Input, Alert } from '@/components/ui';
import { ROUTES } from '@/constants/app';
import { DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD, SEED_CREDENTIALS } from '@/constants/seed-credentials';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function getLoginErrorMessage(error: unknown): { message: string; lockedUntil?: string } {
  const err = error as FetchBaseQueryError;
  const data = err?.data as { message?: string; lockedUntil?: string; error?: string } | undefined;
  const message = data?.message ?? 'Invalid email or password';
  if (message.toLowerCase().includes('locked') || data?.lockedUntil) {
    return { message, lockedUntil: data?.lockedUntil };
  }
  if (message.toLowerCase().includes('disabled') || message.toLowerCase().includes('inactive')) {
    return { message: 'Your account has been disabled. Contact your administrator.' };
  }
  return { message };
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resolved } = useAppSelector((s) => s.theme);
  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: DEFAULT_LOGIN_EMAIL,
      password: DEFAULT_LOGIN_PASSWORD,
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const result = await login(data).unwrap();
      if (result.mfaRequired) {
        dispatch(setMfaRequired(true));
        navigate(ROUTES.OTP);
        return;
      }
      if (!result.user || !result.tokens) {
        setLoginError('Login failed. Please try again.');
        return;
      }
      dispatch(setCredentials({ user: result.user, tokens: result.tokens, remember: data.rememberMe }));
      toast.success(`Welcome back, ${result.user.firstName}`);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const { message, lockedUntil } = getLoginErrorMessage(err);
      if (lockedUntil || message.toLowerCase().includes('locked')) {
        const params = new URLSearchParams();
        if (lockedUntil) params.set('until', lockedUntil);
        params.set('reason', message);
        navigate(`${ROUTES.ACCOUNT_LOCKED}?${params.toString()}`);
        return;
      }
      setLoginError(message);
    }
  };

  return (
    <AuthSplitLayout
      title="Sign in to NDDTP"
      subtitle="Use your official Ministry of Defence credentials"
      footer={
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setTheme())}
              aria-label="Toggle theme"
            >
              {resolved === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Language (EN)" title="English">
              <FiGlobe className="h-4 w-4" />
            </Button>
          </div>
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-foreground hover:underline">
            Forgot password?
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-label="Login form">
        {loginError && (
          <Alert variant="danger" title="Sign in failed">
            {loginError}
          </Alert>
        )}
        <Input
          label="Username or Email"
          type="text"
          placeholder="name@mod.gov.rw"
          autoComplete="username"
          error={errors.email?.message}
          {...register('email')}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" {...register('rememberMe')} className="rounded border-border" />
          Remember me
        </label>
        <Button type="submit" className="w-full" isLoading={isLoading}>
          <FiLock className="h-4 w-4" /> Sign In
        </Button>
      </form>

      <Alert variant="info" className="mt-6" title="Demo credentials (pre-filled)">
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">{SEED_CREDENTIALS.admin.label}:</strong>{' '}
            <code>{SEED_CREDENTIALS.admin.email}</code>
          </li>
          <li>
            <strong className="text-foreground">{SEED_CREDENTIALS.mfa.label}:</strong> OTP{' '}
            <code>{SEED_CREDENTIALS.mfa.otp}</code>
          </li>
        </ul>
      </Alert>
    </AuthSplitLayout>
  );
}
