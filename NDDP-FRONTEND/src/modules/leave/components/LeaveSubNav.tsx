import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/leave/dashboard' },
  { label: 'My Leave', path: '/leave/my-leave' },
  { label: 'Requests', path: '/leave/requests' },
  { label: 'Calendar', path: '/leave/calendar' },
  { label: 'Team Calendar', path: '/leave/team-calendar' },
  { label: 'Balances', path: '/leave/balances' },
  { label: 'Leave Types', path: '/leave/types' },
  { label: 'Holidays', path: '/leave/holidays' },
  { label: 'Approvals', path: '/leave/approvals' },
  { label: 'Delegation', path: '/leave/delegation' },
  { label: 'Policies', path: '/leave/policies' },
  { label: 'History', path: '/leave/history' },
  { label: 'Reports', path: '/leave/reports' },
  { label: 'Settings', path: '/leave/settings' },
] as const;

export function LeaveSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Leave management">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
