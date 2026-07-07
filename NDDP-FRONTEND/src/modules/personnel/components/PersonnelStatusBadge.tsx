import { cn } from '@/utils/cn';
import type { ServiceStatus } from '../constants/personnel-data';

const STYLES: Record<ServiceStatus, string> = {
  ACTIVE: 'bg-success/10 text-success',
  ON_LEAVE: 'bg-warning/10 text-warning',
  IN_TRAINING: 'bg-primary/10 text-primary',
  SUSPENDED: 'bg-destructive/10 text-destructive',
  RETIRED: 'bg-muted text-muted-foreground',
  SEPARATED: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
};

const LABELS: Record<ServiceStatus, string> = {
  ACTIVE: 'Active',
  ON_LEAVE: 'On Leave',
  IN_TRAINING: 'In Training',
  SUSPENDED: 'Suspended',
  RETIRED: 'Retired',
  SEPARATED: 'Separated',
  PENDING: 'Pending',
};

export function PersonnelStatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? STYLES.PENDING)}>
      {LABELS[status] ?? status}
    </span>
  );
}
