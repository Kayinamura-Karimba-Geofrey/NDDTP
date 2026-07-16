import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/assets/dashboard' },
  { label: 'Registry', path: '/assets/registry' },
  { label: 'Categories', path: '/assets/categories' },
  { label: 'Types', path: '/assets/types' },
  { label: 'Assignment', path: '/assets/assignment' },
  { label: 'Transfers', path: '/assets/transfers' },
  { label: 'Returns', path: '/assets/returns' },
  { label: 'Maintenance', path: '/assets/maintenance' },
  { label: 'Inspections', path: '/assets/inspections' },
  { label: 'Warranty', path: '/assets/warranty' },
  { label: 'Lifecycle', path: '/assets/lifecycle' },
  { label: 'Documents', path: '/assets/documents' },
  { label: 'Reservations', path: '/assets/reservations' },
  { label: 'Disposal', path: '/assets/disposal' },
  { label: 'Audit', path: '/assets/audit' },
  { label: 'Barcodes', path: '/assets/barcodes' },
  { label: 'Reports', path: '/assets/reports' },
  { label: 'Settings', path: '/assets/settings' },
] as const;

export function AssetSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Assets">
      {LINKS.map((link) => (
        <Link key={link.path} to={link.path} className={cn('shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors', pathname === link.path || pathname.startsWith(`${link.path}/`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
