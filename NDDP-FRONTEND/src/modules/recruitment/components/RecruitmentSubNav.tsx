import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/recruitment/dashboard' },
  { label: 'Workforce Requests', path: '/recruitment/workforce-requests' },
  { label: 'Requisitions', path: '/recruitment/requisitions' },
  { label: 'Vacancies', path: '/recruitment/vacancies' },
  { label: 'Advertisements', path: '/recruitment/advertisements' },
  { label: 'Applications', path: '/recruitment/applications' },
  { label: 'Screening', path: '/recruitment/screening' },
  { label: 'Shortlisting', path: '/recruitment/shortlisting' },
  { label: 'Assessments', path: '/recruitment/assessments' },
  { label: 'Interviews', path: '/recruitment/interviews' },
  { label: 'Offers', path: '/recruitment/offers' },
  { label: 'Onboarding', path: '/recruitment/onboarding' },
  { label: 'Talent Pool', path: '/recruitment/talent-pool' },
  { label: 'Calendar', path: '/recruitment/calendar' },
  { label: 'Reports', path: '/recruitment/reports' },
  { label: 'Settings', path: '/recruitment/settings' },
] as const;

export function RecruitmentSubNav() {
  const { pathname } = useLocation();
  const isDetail = /^\/recruitment\/candidates\/[^/]+$/.test(pathname);
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Recruitment">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path || (link.path === '/recruitment/applications' && isDetail)
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
