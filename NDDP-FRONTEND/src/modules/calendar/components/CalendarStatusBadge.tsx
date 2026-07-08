import { cn } from '@/utils/cn';
import type { CalendarStatus } from '../constants/calendar-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  CANCELLED: 'bg-destructive/10 text-destructive',
  COMPLETED: 'bg-success/10 text-success',
  PENDING: 'bg-warning/10 text-warning',
  ACCEPTED: 'bg-success/10 text-success',
  DECLINED: 'bg-destructive/10 text-destructive',
  TENTATIVE: 'bg-warning/10 text-warning',
  AVAILABLE: 'bg-success/10 text-success',
  BUSY: 'bg-warning/10 text-warning',
  CONFLICT: 'bg-destructive/10 text-destructive',
  RESOLVED: 'bg-success/10 text-success',
};

export function CalendarStatusBadge({ status }: { status: CalendarStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
