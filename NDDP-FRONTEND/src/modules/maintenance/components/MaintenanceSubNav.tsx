import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/maintenance/dashboard' },
  { label: 'Work Orders', path: '/maintenance/work-orders' },
  { label: 'Requests', path: '/maintenance/requests' },
  { label: 'Pending', path: '/maintenance/requests/pending' },
  { label: 'My Requests', path: '/maintenance/requests/mine' },
  { label: 'Preventive', path: '/maintenance/preventive' },
  { label: 'Assets', path: '/maintenance/assets' },
  { label: 'Technicians', path: '/maintenance/technicians' },
  { label: 'Parts', path: '/maintenance/parts' },
  { label: 'Categories', path: '/maintenance/categories' },
  { label: 'SLA', path: '/maintenance/sla' },
  { label: 'Reports', path: '/maintenance/reports' },
  { label: 'Settings', path: '/maintenance/settings' },
] as const;

export function MaintenanceSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Maintenance">
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
