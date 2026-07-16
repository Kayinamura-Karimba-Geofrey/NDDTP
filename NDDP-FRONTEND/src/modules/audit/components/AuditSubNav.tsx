import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/audit/dashboard' },
  { label: 'Audit Logs', path: '/audit/logs' },
  { label: 'User Activity', path: '/audit/user-activity' },
  { label: 'System Activity', path: '/audit/system-activity' },
  { label: 'API Activity', path: '/audit/api-activity' },
  { label: 'Compliance', path: '/audit/compliance' },
  { label: 'Security Events', path: '/audit/security-events' },
  { label: 'Config Changes', path: '/audit/config-changes' },
  { label: 'Tracing', path: '/audit/tracing' },
  { label: 'System Health', path: '/audit/system-monitoring' },
  { label: 'Infrastructure', path: '/audit/infrastructure' },
  { label: 'Performance', path: '/audit/performance' },
  { label: 'Errors', path: '/audit/errors' },
  { label: 'Alerts', path: '/audit/alerts' },
  { label: 'Incidents', path: '/audit/incidents' },
  { label: 'Log Explorer', path: '/audit/log-explorer' },
  { label: 'Reports', path: '/audit/reports' },
  { label: 'Integrations', path: '/audit/integrations' },
  { label: 'Settings', path: '/audit/settings' },
] as const;

export function AuditSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Audit">
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
