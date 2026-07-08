import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/facilities/dashboard' },
  { label: 'Directory', path: '/facilities/directory' },
  { label: 'Types', path: '/facilities/types' },
  { label: 'Spaces', path: '/facilities/spaces' },
  { label: 'Available', path: '/facilities/spaces/available' },
  { label: 'Bookings', path: '/facilities/bookings' },
  { label: 'My Bookings', path: '/facilities/bookings/mine' },
  { label: 'Occupancy', path: '/facilities/occupancy' },
  { label: 'Utilities', path: '/facilities/utilities' },
  { label: 'Inspections', path: '/facilities/inspections' },
  { label: 'Access', path: '/facilities/access' },
  { label: 'Reports', path: '/facilities/reports' },
  { label: 'Settings', path: '/facilities/settings' },
] as const;

function isActive(pathname: string, path: string) {
  if (pathname === path) return true;
  if (!pathname.startsWith(`${path}/`)) return false;
  // Prefer longer route matches (e.g. /spaces/available over /spaces)
  const longerMatch = LINKS.some((l) => l.path !== path && l.path.startsWith(`${path}/`) && (pathname === l.path || pathname.startsWith(`${l.path}/`)));
  return !longerMatch;
}

export function FacilitiesSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Facilities">
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
