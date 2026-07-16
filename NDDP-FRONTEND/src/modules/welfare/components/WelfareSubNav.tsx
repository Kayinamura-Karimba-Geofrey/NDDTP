import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/welfare/dashboard' },
  { label: 'My Welfare', path: '/welfare/my-welfare' },
  { label: 'Programs', path: '/welfare/programs' },
  { label: 'Benefits', path: '/welfare/benefits' },
  { label: 'Assistance', path: '/welfare/assistance' },
  { label: 'Emergency', path: '/welfare/emergency' },
  { label: 'Counseling', path: '/welfare/counseling' },
  { label: 'Family Support', path: '/welfare/family-support' },
  { label: 'Wellness', path: '/welfare/wellness' },
  { label: 'Events', path: '/welfare/events' },
  { label: 'Applications', path: '/welfare/applications' },
  { label: 'Approvals', path: '/welfare/approvals' },
  { label: 'Documents', path: '/welfare/documents' },
  { label: 'History', path: '/welfare/history' },
  { label: 'Reports', path: '/welfare/reports' },
  { label: 'Settings', path: '/welfare/settings' },
] as const;

export function WelfareSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Welfare">
      {LINKS.map((link) => (
        <Link key={link.path} to={link.path} className={cn('shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors', pathname === link.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
