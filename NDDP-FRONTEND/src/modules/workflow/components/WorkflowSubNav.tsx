import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/workflow/dashboard' },
  { label: 'Templates', path: '/workflow/templates' },
  { label: 'Designer', path: '/workflow/designer' },
  { label: 'Rules', path: '/workflow/rules' },
  { label: 'Chains', path: '/workflow/approval-chains' },
  { label: 'Running', path: '/workflow/running' },
  { label: 'Tasks', path: '/workflow/tasks' },
  { label: 'My Approvals', path: '/workflow/my-approvals' },
  { label: 'Delegation', path: '/workflow/delegation' },
  { label: 'Escalation', path: '/workflow/escalation' },
  { label: 'SLA', path: '/workflow/sla' },
  { label: 'Automation', path: '/workflow/automation' },
  { label: 'Notifications', path: '/workflow/notifications' },
  { label: 'History', path: '/workflow/history' },
  { label: 'Analytics', path: '/workflow/analytics' },
  { label: 'Reports', path: '/workflow/reports' },
  { label: 'Integrations', path: '/workflow/integrations' },
  { label: 'Settings', path: '/workflow/settings' },
] as const;

export function WorkflowSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Workflow">
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
