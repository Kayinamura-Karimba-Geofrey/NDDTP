import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock } from 'react-icons/fi';
import { useAppDispatch } from '@/store';
import { setCredentials, setMfaRequired } from '@/store/slices/auth-slice';
import { useLoginMutation } from '../api/auth.api';
import { loginSchema, type LoginFormData } from '../schemas/auth.schemas';
import { AuthLayout } from '@/layouts/MainLayout';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Alert } from '@/components/ui';
import { BRANDING } from '@/constants/branding';
import { ROUTES } from '@/constants/app';
import { DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD, SEED_CREDENTIALS } from '@/constants/seed-credentials';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
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
    try {
      const result = await login(data).unwrap();
      if (result.mfaRequired) {
        dispatch(setMfaRequired(true));
        navigate(ROUTES.OTP);
        return;
      }
      if (!result.user || !result.tokens) {
        toast.error('Login failed');
        return;
      }
      dispatch(setCredentials({ user: result.user, tokens: result.tokens, remember: data.rememberMe }));
      toast.success(`Welcome back, ${result.user.firstName}`);
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Invalid email or password');
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] lg:grid-cols-2">
          <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
            <div>
              <img
                src={BRANDING.logoUrl}
                alt={BRANDING.forceName}
                className="mb-6 h-16 w-16 rounded-xl object-cover ring-2 ring-white/20"
              />
              <h1 className="text-2xl font-bold leading-tight">{BRANDING.platformName}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{BRANDING.tagline}</p>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p>{BRANDING.organization}</p>
              <p>{BRANDING.contact.address}</p>
              <a href={BRANDING.modWebsite} className="text-white hover:underline" target="_blank" rel="noreferrer">
                {BRANDING.modWebsite}
              </a>
            </div>
          </div>

          <Card className="rounded-none border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Sign in to NDDTP</CardTitle>
              <CardDescription>
                Use your official Ministry of Defence credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <Input
                  label="Official Email"
                  type="email"
                  placeholder="name@mod.gov.rw"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" {...register('rememberMe')} className="rounded border-border" />
                    Remember me
                  </label>
                  <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-foreground hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  <FiLock className="h-4 w-4" /> Sign In
                </Button>
              </form>
              <Alert variant="info" className="mt-6" title="Demo credentials (pre-filled)">
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">{SEED_CREDENTIALS.admin.label}:</strong>{' '}
                    <code>{SEED_CREDENTIALS.admin.email}</code> / <code>{SEED_CREDENTIALS.admin.password}</code>
                  </li>
                  <li>
                    <strong className="text-foreground">{SEED_CREDENTIALS.officer.label}:</strong>{' '}
                    <code>{SEED_CREDENTIALS.officer.email}</code> / <code>{SEED_CREDENTIALS.officer.password}</code>
                  </li>
                  <li>
                    <strong className="text-foreground">{SEED_CREDENTIALS.mfa.label}:</strong>{' '}
                    <code>{SEED_CREDENTIALS.mfa.email}</code> / <code>{SEED_CREDENTIALS.mfa.password}</code> → OTP{' '}
                    <code>{SEED_CREDENTIALS.mfa.otp}</code>
                  </li>
                </ul>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
