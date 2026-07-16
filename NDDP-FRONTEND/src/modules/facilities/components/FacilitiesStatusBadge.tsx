import { cn } from '@/utils/cn';
import type { FacilitiesStatus } from '../constants/facilities-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  UNDER_RENOVATION: 'bg-warning/10 text-warning',
  CLOSED: 'bg-muted text-muted-foreground',
  AVAILABLE: 'bg-success/10 text-success',
  OCCUPIED: 'bg-primary/10 text-primary',
  RESERVED: 'bg-warning/10 text-warning',
  MAINTENANCE: 'bg-warning/10 text-warning',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  COMPLETED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
};

export function FacilitiesStatusBadge({ status }: { status: FacilitiesStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
