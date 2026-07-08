import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Overview', path: '/profile' },
  { label: 'Edit', path: '/profile/edit' },
  { label: 'Addresses', path: '/profile/addresses' },
  { label: 'Emergency', path: '/profile/emergency-contacts' },
  { label: 'Preferences', path: '/profile/preferences' },
  { label: 'Activity', path: '/profile/activity' },
] as const;

function isActive(pathname: string, path: string) {
  if (path === '/profile') return pathname === '/profile';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function ProfileSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="My Profile">
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
