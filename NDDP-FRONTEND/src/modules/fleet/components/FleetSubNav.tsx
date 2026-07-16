import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/fleet/dashboard' },
  { label: 'Registry', path: '/fleet/registry' },
  { label: 'Drivers', path: '/fleet/drivers' },
  { label: 'Licensing', path: '/fleet/licensing' },
  { label: 'Assignments', path: '/fleet/assignments' },
  { label: 'Trip Requests', path: '/fleet/trip-requests' },
  { label: 'Scheduling', path: '/fleet/scheduling' },
  { label: 'Dispatch', path: '/fleet/dispatch' },
  { label: 'Fuel', path: '/fleet/fuel' },
  { label: 'Maintenance', path: '/fleet/maintenance' },
  { label: 'Inspections', path: '/fleet/inspections' },
  { label: 'Incidents', path: '/fleet/incidents' },
  { label: 'GPS', path: '/fleet/gps' },
  { label: 'Parking', path: '/fleet/parking' },
  { label: 'Calendar', path: '/fleet/calendar' },
  { label: 'Approvals', path: '/fleet/approvals' },
  { label: 'Reports', path: '/fleet/reports' },
  { label: 'History', path: '/fleet/history' },
  { label: 'Settings', path: '/fleet/settings' },
] as const;

export function FleetSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Fleet">
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
