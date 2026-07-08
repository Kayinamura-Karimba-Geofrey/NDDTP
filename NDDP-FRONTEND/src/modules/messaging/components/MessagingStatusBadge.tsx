import { cn } from '@/utils/cn';
import type { MessagingStatus } from '../constants/messaging-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  ARCHIVED: 'bg-muted text-muted-foreground',
  MUTED: 'bg-warning/10 text-warning',
  SENT: 'bg-primary/10 text-primary',
  DELIVERED: 'bg-primary/10 text-primary',
  READ: 'bg-success/10 text-success',
  FAILED: 'bg-destructive/10 text-destructive',
  DRAFT: 'bg-muted text-muted-foreground',
  ONLINE: 'bg-success/10 text-success',
  OFFLINE: 'bg-muted text-muted-foreground',
  AWAY: 'bg-warning/10 text-warning',
  PENDING: 'bg-warning/10 text-warning',
};

export function MessagingStatusBadge({ status }: { status: MessagingStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
