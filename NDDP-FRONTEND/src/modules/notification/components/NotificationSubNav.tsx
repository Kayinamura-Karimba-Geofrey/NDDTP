import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', path: '/notifications/dashboard' },
  { label: 'Center', path: '/notifications/center' },
  { label: 'My Notifications', path: '/notifications/my' },
  { label: 'Announcements', path: '/notifications/announcements' },
  { label: 'Broadcast', path: '/notifications/broadcast' },
  { label: 'Email Templates', path: '/notifications/email-templates' },
  { label: 'SMS Templates', path: '/notifications/sms-templates' },
  { label: 'Push Templates', path: '/notifications/push-templates' },
  { label: 'Templates', path: '/notifications/templates' },
  { label: 'Scheduled', path: '/notifications/scheduled' },
  { label: 'Reminders', path: '/notifications/reminders' },
  { label: 'Preferences', path: '/notifications/preferences' },
  { label: 'Delivery', path: '/notifications/delivery' },
  { label: 'Failed', path: '/notifications/failed' },
  { label: 'Retry Queue', path: '/notifications/retry' },
  { label: 'History', path: '/notifications/history' },
  { label: 'Reports', path: '/notifications/reports' },
  { label: 'Integrations', path: '/notifications/integrations' },
  { label: 'Settings', path: '/notifications/settings' },
] as const;

export function NotificationSubNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-3" aria-label="Notifications">
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
