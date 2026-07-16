import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/messaging/dashboard' },
  { label: 'Inbox', path: '/messaging/inbox' },
  { label: 'Channels', path: '/messaging/channels' },
  { label: 'Direct', path: '/messaging/direct' },
  { label: 'Groups', path: '/messaging/groups' },
  { label: 'Departments', path: '/messaging/departments' },
  { label: 'Broadcasts', path: '/messaging/broadcasts' },
  { label: 'Compose', path: '/messaging/compose' },
  { label: 'Members', path: '/messaging/members' },
  { label: 'Archived', path: '/messaging/archived' },
  { label: 'Receipts', path: '/messaging/receipts' },
  { label: 'Presence', path: '/messaging/presence' },
  { label: 'Files', path: '/messaging/files' },
  { label: 'Search', path: '/messaging/search' },
  { label: 'Settings', path: '/messaging/settings' },
] as const;

export function MessagingSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Messaging">
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
