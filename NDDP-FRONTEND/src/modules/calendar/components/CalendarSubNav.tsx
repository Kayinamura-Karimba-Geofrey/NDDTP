import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/calendar/dashboard' },
  { label: 'Calendar View', path: '/calendar/view' },
  { label: 'My Events', path: '/calendar/my-events' },
  { label: 'All Events', path: '/calendar/events' },
  { label: 'Calendars', path: '/calendar/calendars' },
  { label: 'Invitations', path: '/calendar/invitations' },
  { label: 'Attendees', path: '/calendar/attendees' },
  { label: 'Rooms', path: '/calendar/rooms' },
  { label: 'Holidays', path: '/calendar/holidays' },
  { label: 'Conflicts', path: '/calendar/conflicts' },
  { label: 'Types', path: '/calendar/types' },
  { label: 'Reports', path: '/calendar/reports' },
  { label: 'Settings', path: '/calendar/settings' },
] as const;

export function CalendarSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Calendar">
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
