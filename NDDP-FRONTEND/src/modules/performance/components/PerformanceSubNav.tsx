import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/performance/dashboard' },
  { label: 'My Performance', path: '/performance/my-performance' },
  { label: 'Org Goals', path: '/performance/org-goals' },
  { label: 'Dept Goals', path: '/performance/department-goals' },
  { label: 'Objectives', path: '/performance/objectives' },
  { label: 'KPIs', path: '/performance/kpis' },
  { label: 'Competencies', path: '/performance/competencies' },
  { label: 'Reviews', path: '/performance/reviews' },
  { label: 'Feedback', path: '/performance/feedback' },
  { label: 'Recognition', path: '/performance/recognition' },
  { label: 'PIPs', path: '/performance/pips' },
  { label: 'IDPs', path: '/performance/development-plans' },
  { label: 'Coaching', path: '/performance/coaching' },
  { label: '360°', path: '/performance/360-feedback' },
  { label: 'Cycles', path: '/performance/review-cycles' },
  { label: 'Approvals', path: '/performance/approvals' },
  { label: 'Reports', path: '/performance/reports' },
  { label: 'History', path: '/performance/history' },
  { label: 'Settings', path: '/performance/settings' },
] as const;

export function PerformanceSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Performance">
      {LINKS.map((link) => (
        <Link key={link.path} to={link.path} className={cn('shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors', pathname === link.path || pathname.startsWith(`${link.path}/`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
