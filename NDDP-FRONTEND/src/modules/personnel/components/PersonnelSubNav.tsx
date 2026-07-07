import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/personnel/dashboard' },
  { label: 'Directory', path: '/personnel/directory' },
  { label: 'Organization', path: '/personnel/organization' },
  { label: 'Departments', path: '/personnel/departments' },
  { label: 'Units', path: '/personnel/units' },
  { label: 'Positions', path: '/personnel/positions' },
  { label: 'Transfers', path: '/personnel/transfers' },
  { label: 'Promotions', path: '/personnel/promotions' },
  { label: 'Qualifications', path: '/personnel/qualifications' },
  { label: 'Skills', path: '/personnel/skills' },
  { label: 'Documents', path: '/personnel/documents' },
  { label: 'Import', path: '/personnel/import' },
  { label: 'Export', path: '/personnel/export' },
  { label: 'Reports', path: '/personnel/reports' },
] as const;

export function PersonnelSubNav() {
  const { pathname } = useLocation();
  const isDetail = /^\/personnel\/[^/]+$/.test(pathname) && !LINKS.some((l) => l.path === pathname);
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Personnel management">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path || (link.path === '/personnel/directory' && isDetail)
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
