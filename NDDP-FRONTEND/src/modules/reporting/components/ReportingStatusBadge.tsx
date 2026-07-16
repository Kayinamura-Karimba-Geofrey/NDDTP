import { cn } from '@/utils/cn';
import type { ReportingStatus } from '../constants/reporting-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  RUNNING: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-success/10 text-success',
  FAILED: 'bg-destructive/10 text-destructive',
  QUEUED: 'bg-warning/10 text-warning',
  DELIVERED: 'bg-success/10 text-success',
  PENDING: 'bg-warning/10 text-warning',
  SUBSCRIBED: 'bg-success/10 text-success',
  PAUSED: 'bg-muted text-muted-foreground',
};

export function ReportingStatusBadge({ status }: { status: ReportingStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
