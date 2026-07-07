import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/medical/dashboard' },
  { label: 'My Medical', path: '/medical/my-medical' },
  { label: 'Profiles', path: '/medical/profiles' },
  { label: 'Appointments', path: '/medical/appointments' },
  { label: 'Assessments', path: '/medical/assessments' },
  { label: 'Clearances', path: '/medical/clearances' },
  { label: 'Fitness', path: '/medical/fitness' },
  { label: 'Vaccinations', path: '/medical/vaccinations' },
  { label: 'Laboratory', path: '/medical/laboratory' },
  { label: 'Referrals', path: '/medical/referrals' },
  { label: 'Documents', path: '/medical/documents' },
  { label: 'Incidents', path: '/medical/incidents' },
  { label: 'Occupational', path: '/medical/occupational-health' },
  { label: 'Campaigns', path: '/medical/campaigns' },
  { label: 'Calendar', path: '/medical/calendar' },
  { label: 'Approvals', path: '/medical/approvals' },
  { label: 'Reports', path: '/medical/reports' },
  { label: 'History', path: '/medical/history' },
  { label: 'Settings', path: '/medical/settings' },
] as const;

export function MedicalSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Medical">
      {LINKS.map((link) => (
        <Link key={link.path} to={link.path} className={cn('shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors', pathname === link.path || pathname.startsWith(`${link.path}/`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
