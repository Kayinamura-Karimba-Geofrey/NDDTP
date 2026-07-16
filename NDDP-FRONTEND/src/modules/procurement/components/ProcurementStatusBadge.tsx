import { cn } from '@/utils/cn';
import type { ProcurementStatus } from '../constants/procurement-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  PENDING_APPROVAL: 'bg-warning/10 text-warning',
  SUBMITTED: 'bg-primary/10 text-primary',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
  RFQ: 'bg-primary/10 text-primary',
  TENDER: 'bg-primary/10 text-primary',
  EVALUATION: 'bg-warning/10 text-warning',
  AWARDED: 'bg-success/10 text-success',
  ORDERED: 'bg-primary/10 text-primary',
  ISSUED: 'bg-primary/10 text-primary',
  DELIVERED: 'bg-success/10 text-success',
  PARTIALLY_DELIVERED: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  CLOSED: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  SUSPENDED: 'bg-destructive/10 text-destructive',
  OPEN: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  MATCHED: 'bg-success/10 text-success',
  MISMATCH: 'bg-destructive/10 text-destructive',
  PARTIAL_MATCH: 'bg-warning/10 text-warning',
  PENDING_REVIEW: 'bg-warning/10 text-warning',
  PUBLISHED: 'bg-primary/10 text-primary',
  UNDER_REVIEW: 'bg-warning/10 text-warning',
  EXPIRED: 'bg-muted text-muted-foreground',
  FULFILLED: 'bg-success/10 text-success',
};

export function ProcurementStatusBadge({ status }: { status: ProcurementStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
