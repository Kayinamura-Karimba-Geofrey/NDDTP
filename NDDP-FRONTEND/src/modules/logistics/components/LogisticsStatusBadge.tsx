import { cn } from '@/utils/cn';
import type { LogisticsStatus } from '../constants/logistics-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  DISPATCHED: 'bg-primary/10 text-primary',
  IN_TRANSIT: 'bg-warning/10 text-warning',
  DELAYED: 'bg-destructive/10 text-destructive',
  DELIVERED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
};

export function LogisticsStatusBadge({ status }: { status: LogisticsStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
