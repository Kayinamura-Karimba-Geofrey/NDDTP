import { cn } from '@/utils/cn';
import type { VisitorModuleStatus } from '../constants/visitor-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
  CHECKED_IN: 'bg-primary/10 text-primary',
  CHECKED_OUT: 'bg-muted text-muted-foreground',
  BLACKLISTED: 'bg-destructive/10 text-destructive',
  COMPLETED: 'bg-success/10 text-success',
  SCHEDULED: 'bg-primary/10 text-primary',
  AVAILABLE: 'bg-success/10 text-success',
  OCCUPIED: 'bg-warning/10 text-warning',
  EXPIRED: 'bg-muted text-muted-foreground',
};

export function VisitorStatusBadge({ status }: { status: VisitorModuleStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
