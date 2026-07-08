import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Executive', path: '/reports/dashboard' },
  { label: 'Operational', path: '/reports/operational' },
  { label: 'KPIs', path: '/reports/kpis' },
  { label: 'Library', path: '/reports/library' },
  { label: 'Builder', path: '/reports/builder' },
  { label: 'Scheduled', path: '/reports/scheduled' },
  { label: 'Subscriptions', path: '/reports/subscriptions' },
  { label: 'Explorer', path: '/reports/explorer' },
  { label: 'Analytics', path: '/reports/analytics' },
  { label: 'Forecasting', path: '/reports/forecasting' },
  { label: 'Geographic', path: '/reports/geographic' },
  { label: 'Comparative', path: '/reports/comparative' },
  { label: 'Exports', path: '/reports/exports' },
  { label: 'Audit', path: '/reports/audit' },
  { label: 'Designer', path: '/reports/designer' },
  { label: 'BI Integrations', path: '/reports/integrations' },
  { label: 'History', path: '/reports/history' },
  { label: 'Settings', path: '/reports/settings' },
] as const;

export function ReportingSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Reporting">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path || pathname.startsWith(`${link.path}/`)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
