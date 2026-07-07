import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/training/dashboard' },
  { label: 'My Learning', path: '/training/my-learning' },
  { label: 'Catalog', path: '/training/catalog' },
  { label: 'Programs', path: '/training/programs' },
  { label: 'Courses', path: '/training/courses' },
  { label: 'Learning Paths', path: '/training/learning-paths' },
  { label: 'Calendar', path: '/training/calendar' },
  { label: 'Enrollments', path: '/training/enrollments' },
  { label: 'Certifications', path: '/training/certifications' },
  { label: 'Competencies', path: '/training/competencies' },
  { label: 'Requests', path: '/training/requests' },
  { label: 'Approvals', path: '/training/approvals' },
  { label: 'History', path: '/training/history' },
  { label: 'Reports', path: '/training/reports' },
  { label: 'Settings', path: '/training/settings' },
] as const;

export function TrainingSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Training">
      {LINKS.map((link) => (
        <Link key={link.path} to={link.path} className={cn('shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors', pathname === link.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
