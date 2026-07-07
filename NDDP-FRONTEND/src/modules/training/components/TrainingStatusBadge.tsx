import { cn } from '@/utils/cn';
import type { TrainingStatus } from '../constants/training-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  ENROLLED: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-success/10 text-success',
  WITHDRAWN: 'bg-muted text-muted-foreground',
  CANCELLED: 'bg-muted text-muted-foreground',
  REQUESTED: 'bg-warning/10 text-warning',
  EXPIRED: 'bg-muted text-muted-foreground',
  EXPIRING_SOON: 'bg-warning/10 text-warning',
  ISSUED: 'bg-success/10 text-success',
  REVOKED: 'bg-destructive/10 text-destructive',
  PRESENT: 'bg-success/10 text-success',
  ABSENT: 'bg-destructive/10 text-destructive',
  EXCUSED: 'bg-muted text-muted-foreground',
  LATE: 'bg-warning/10 text-warning',
  PASS: 'bg-success/10 text-success',
  FAIL: 'bg-destructive/10 text-destructive',
  NOT_STARTED: 'bg-muted text-muted-foreground',
  SCHEDULED: 'bg-primary/10 text-primary',
};

export function TrainingStatusBadge({ status }: { status: TrainingStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
