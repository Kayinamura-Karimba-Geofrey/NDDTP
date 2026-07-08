import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/visitors/dashboard' },
  { label: 'Directory', path: '/visitors/directory' },
  { label: 'Visit Requests', path: '/visitors/requests' },
  { label: 'Pending', path: '/visitors/requests/pending' },
  { label: 'My Visits', path: '/visitors/requests/mine' },
  { label: 'Check-In Desk', path: '/visitors/check-in' },
  { label: 'On Site', path: '/visitors/on-site' },
  { label: 'Sites', path: '/visitors/sites' },
  { label: 'Badges', path: '/visitors/badges' },
  { label: 'Blacklist', path: '/visitors/blacklist' },
  { label: 'History', path: '/visitors/history' },
  { label: 'Reports', path: '/visitors/reports' },
  { label: 'Settings', path: '/visitors/settings' },
] as const;

export function VisitorSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Visitors">
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
