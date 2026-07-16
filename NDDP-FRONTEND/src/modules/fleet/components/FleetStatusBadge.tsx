import { cn } from '@/utils/cn';
import type { FleetStatus } from '../constants/fleet-data';

const STYLES: Record<string, string> = {
  AVAILABLE: 'bg-success/10 text-success',
  ASSIGNED: 'bg-primary/10 text-primary',
  ON_TRIP: 'bg-primary/10 text-primary',
  UNDER_MAINTENANCE: 'bg-warning/10 text-warning',
  OUT_OF_SERVICE: 'bg-destructive/10 text-destructive',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
  PASSED: 'bg-success/10 text-success',
  REQUIRES_REPAIR: 'bg-warning/10 text-warning',
  FAILED: 'bg-destructive/10 text-destructive',
  OPEN: 'bg-warning/10 text-warning',
  CLOSED: 'bg-muted text-muted-foreground',
  INVESTIGATING: 'bg-warning/10 text-warning',
  RETURNED: 'bg-muted text-muted-foreground',
  RETIRED: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-muted text-muted-foreground',
};

export function FleetStatusBadge({ status }: { status: FleetStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
