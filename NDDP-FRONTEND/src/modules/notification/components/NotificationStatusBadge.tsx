import { cn } from '@/utils/cn';
import type { NotificationStatus } from '../constants/notification-data';

const STYLES: Record<string, string> = {
  QUEUED: 'bg-muted text-muted-foreground',
  SENT: 'bg-primary/10 text-primary',
  DELIVERED: 'bg-success/10 text-success',
  OPENED: 'bg-success/10 text-success',
  FAILED: 'bg-destructive/10 text-destructive',
  EXPIRED: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  READ: 'bg-muted text-muted-foreground',
  UNREAD: 'bg-primary/10 text-primary',
  ARCHIVED: 'bg-muted text-muted-foreground',
  RETRIED: 'bg-warning/10 text-warning',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  PUBLISHED: 'bg-success/10 text-success',
  DRAFT: 'bg-muted text-muted-foreground',
  CANCELLED: 'bg-destructive/10 text-destructive',
};

export function NotificationStatusBadge({ status }: { status: NotificationStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
