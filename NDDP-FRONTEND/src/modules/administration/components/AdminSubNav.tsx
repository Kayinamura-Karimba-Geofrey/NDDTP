import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/administration/dashboard' },
  { label: 'Namespaces', path: '/administration/namespaces' },
  { label: 'Entries', path: '/administration/entries' },
  { label: 'Revisions', path: '/administration/revisions' },
  { label: 'Health', path: '/administration/health' },
  { label: 'Reports', path: '/administration/reports' },
  { label: 'Settings', path: '/administration/settings' },
] as const;

function isActive(pathname: string, path: string) {
  if (pathname === path) return true;
  if (!pathname.startsWith(`${path}/`)) return false;
  const longerMatch = LINKS.some((l) => l.path !== path && l.path.startsWith(`${path}/`) && (pathname === l.path || pathname.startsWith(`${l.path}/`)));
  return !longerMatch;
}

export function AdminSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="System Administration">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive(pathname, link.path)
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
