import { cn } from '@/utils/cn';
import type { MaintenanceStatus } from '../constants/maintenance-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-success/10 text-success',
  SKIPPED: 'bg-muted text-muted-foreground',
  ON_HOLD: 'bg-warning/10 text-warning',
  OVERDUE: 'bg-destructive/10 text-destructive',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  OPEN: 'bg-warning/10 text-warning',
  CLOSED: 'bg-muted text-muted-foreground',
};

export function MaintenanceStatusBadge({ status }: { status: MaintenanceStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
