import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/app';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Sessions', path: ROUTES.SESSIONS },
  { label: 'Login History', path: ROUTES.LOGIN_HISTORY },
  { label: 'Security Settings', path: ROUTES.SECURITY_SETTINGS },
  { label: 'Devices', path: ROUTES.DEVICES },
  { label: 'Change Password', path: ROUTES.CHANGE_PASSWORD },
] as const;

export function AuthSecurityNav() {
  const { pathname } = useLocation();

  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4" aria-label="Account security">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path
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
