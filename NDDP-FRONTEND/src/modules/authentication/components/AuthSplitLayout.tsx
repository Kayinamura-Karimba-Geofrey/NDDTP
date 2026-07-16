import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { AuthLayout } from '@/layouts/MainLayout';
import { BRANDING } from '@/constants/branding';
import { ROUTES } from '@/constants/app';

interface AuthSplitLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthSplitLayout({ title, subtitle, children, footer }: AuthSplitLayoutProps) {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4 md:p-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] lg:grid-cols-2">
          <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
            <div>
              <Link to={ROUTES.LOGIN}>
                <img
                  src={BRANDING.logoUrl}
                  alt={BRANDING.forceName}
                  className="mb-6 h-16 w-16 rounded-xl object-cover ring-2 ring-white/20"
                />
              </Link>
              <h1 className="text-2xl font-bold leading-tight">{BRANDING.platformName}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{BRANDING.tagline}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <FiShield className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <div className="text-sm text-white/80">
                  <p className="font-semibold text-white">Security Notice</p>
                  <p className="mt-1">
                    Authorized personnel only. All access is monitored and logged in accordance with
                    Ministry of Defence information security policies.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm text-white/70">
              <p>{BRANDING.organization}</p>
              <p>{BRANDING.contact.address}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <div className="mb-6 lg:hidden">
              <img src={BRANDING.logoUrl} alt="" className="mb-3 h-12 w-12 rounded-lg object-cover" />
              <p className="text-xs font-bold text-foreground">{BRANDING.platformAcronym}</p>
            </div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            <div className="mt-6">{children}</div>
            {footer && <div className="mt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
