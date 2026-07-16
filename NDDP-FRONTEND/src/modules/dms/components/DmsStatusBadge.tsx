import { cn } from '@/utils/cn';
import type { DmsStatus } from '../constants/dms-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  PENDING_APPROVAL: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  PENDING_SIGNATURE: 'bg-warning/10 text-warning',
  SIGNED: 'bg-success/10 text-success',
  ARCHIVED: 'bg-muted text-muted-foreground',
  PENDING_DISPOSAL: 'bg-warning/10 text-warning',
  DISPOSED: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  REJECTED: 'bg-destructive/10 text-destructive',
  IN_REVIEW: 'bg-primary/10 text-primary',
  LEGAL_HOLD: 'bg-destructive/10 text-destructive',
  EXPIRED: 'bg-muted text-muted-foreground',
  SHARED: 'bg-primary/10 text-primary',
};

export function DmsStatusBadge({ status }: { status: DmsStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
