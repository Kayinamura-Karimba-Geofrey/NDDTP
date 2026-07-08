import { cn } from '@/utils/cn';
import type { PerformanceStatus } from '../constants/performance-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-success/10 text-success',
  COMPLETED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  OPEN: 'bg-primary/10 text-primary',
  CLOSED: 'bg-muted text-muted-foreground',
  ARCHIVED: 'bg-muted text-muted-foreground',
  PLANNED: 'bg-primary/10 text-primary',
  SELF_SUBMITTED: 'bg-primary/10 text-primary',
  MANAGER_REVIEW: 'bg-warning/10 text-warning',
  CALIBRATION: 'bg-warning/10 text-warning',
  FINALIZED: 'bg-success/10 text-success',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  ON_TRACK: 'bg-success/10 text-success',
  AT_RISK: 'bg-warning/10 text-warning',
  OVERDUE: 'bg-destructive/10 text-destructive',
};

export function PerformanceStatusBadge({ status }: { status: PerformanceStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
