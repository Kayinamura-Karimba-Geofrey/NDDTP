import { cn } from '@/utils/cn';
import type { MedicalStatus } from '../constants/medical-data';

const STYLES: Record<string, string> = {
  SCHEDULED: 'bg-primary/10 text-primary',
  CONFIRMED: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  NO_SHOW: 'bg-destructive/10 text-destructive',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  DRAFT: 'bg-muted text-muted-foreground',
  ISSUED: 'bg-success/10 text-success',
  REVOKED: 'bg-destructive/10 text-destructive',
  EXPIRED: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-success/10 text-success',
  CLEARED: 'bg-success/10 text-success',
  RESTRICTED: 'bg-warning/10 text-warning',
  UNDER_REVIEW: 'bg-warning/10 text-warning',
  FIT: 'bg-success/10 text-success',
  FIT_WITH_RESTRICTIONS: 'bg-warning/10 text-warning',
  TEMPORARILY_UNFIT: 'bg-destructive/10 text-destructive',
  LIMITED_DUTY: 'bg-warning/10 text-warning',
  RESOLVED: 'bg-success/10 text-success',
  OPEN: 'bg-warning/10 text-warning',
};

export function MedicalStatusBadge({ status }: { status: MedicalStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
