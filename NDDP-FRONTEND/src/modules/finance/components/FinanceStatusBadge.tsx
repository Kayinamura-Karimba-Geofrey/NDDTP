import { cn } from '@/utils/cn';
import type { FinanceStatus } from '../constants/finance-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  SUBMITTED: 'bg-primary/10 text-primary',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  ACTIVE: 'bg-success/10 text-success',
  CLOSED: 'bg-muted text-muted-foreground',
  ARCHIVED: 'bg-muted text-muted-foreground',
  OPEN: 'bg-success/10 text-success',
  PAID: 'bg-success/10 text-success',
  OVERDUE: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
  COMMITTED: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  PARTIAL: 'bg-warning/10 text-warning',
  MATCHED: 'bg-success/10 text-success',
  UNDER_REVIEW: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  SUSPENDED: 'bg-destructive/10 text-destructive',
};

export function FinanceStatusBadge({ status }: { status: FinanceStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
