import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/administration/authorization' },
  { label: 'Roles', path: '/administration/roles' },
  { label: 'Permissions', path: '/administration/permissions' },
  { label: 'Groups', path: '/administration/permission-groups' },
  { label: 'Hierarchy', path: '/administration/role-hierarchy' },
  { label: 'Assignments', path: '/administration/assignments' },
  { label: 'Resources', path: '/administration/resource-permissions' },
  { label: 'Menu', path: '/administration/menu-permissions' },
  { label: 'Actions', path: '/administration/action-permissions' },
  { label: 'Approvals', path: '/administration/approval-levels' },
  { label: 'Delegation', path: '/administration/delegated-access' },
  { label: 'Policies', path: '/administration/access-policies' },
  { label: 'Requests', path: '/administration/access-requests' },
  { label: 'Temporary', path: '/administration/temporary-access' },
  { label: 'Audit', path: '/administration/permission-audit' },
  { label: 'Settings', path: '/administration/authorization-settings' },
] as const;

export function AuthorizationSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Authorization">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === link.path
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
