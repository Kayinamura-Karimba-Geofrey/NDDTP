import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/users/dashboard' },
  { label: 'All Users', path: '/users/list' },
  { label: 'Departments', path: '/users/departments' },
  { label: 'Positions', path: '/users/positions' },
  { label: 'Organization', path: '/users/organization' },
  { label: 'Status', path: '/users/status' },
  { label: 'Documents', path: '/users/documents' },
  { label: 'Import', path: '/users/import' },
  { label: 'Export', path: '/users/export' },
  { label: 'History', path: '/users/history' },
  { label: 'Settings', path: '/users/settings' },
] as const;

export function UserSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="User management">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path || (link.path === '/users/list' && pathname.startsWith('/users/') && pathname.match(/^\/users\/[^/]+$/))
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
