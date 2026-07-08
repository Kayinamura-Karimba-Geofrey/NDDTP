import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/dms/dashboard' },
  { label: 'Library', path: '/dms/library' },
  { label: 'My Documents', path: '/dms/my-documents' },
  { label: 'Shared', path: '/dms/shared' },
  { label: 'Recent', path: '/dms/recent' },
  { label: 'Folders', path: '/dms/folders' },
  { label: 'Upload', path: '/dms/upload' },
  { label: 'Versions', path: '/dms/versions' },
  { label: 'Metadata', path: '/dms/metadata' },
  { label: 'Signatures', path: '/dms/signatures' },
  { label: 'Approvals', path: '/dms/approvals' },
  { label: 'Retention', path: '/dms/retention' },
  { label: 'Archive', path: '/dms/archive' },
  { label: 'Search', path: '/dms/search' },
  { label: 'Permissions', path: '/dms/permissions' },
  { label: 'Audit', path: '/dms/audit' },
  { label: 'Reports', path: '/dms/reports' },
  { label: 'Settings', path: '/dms/settings' },
] as const;

export function DmsSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="DMS">
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
