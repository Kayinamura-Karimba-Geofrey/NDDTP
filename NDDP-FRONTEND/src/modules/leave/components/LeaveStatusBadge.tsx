import { cn } from '@/utils/cn';
import type { LeaveRequestStatus } from '../constants/leave-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  PENDING_APPROVAL: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
};

export function LeaveStatusBadge({ status }: { status: LeaveRequestStatus | string }) {
  const label = String(status).replace(/_/g, ' ');
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {label}
    </span>
  );
}
