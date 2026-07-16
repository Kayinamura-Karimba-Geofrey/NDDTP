import { cn } from '@/utils/cn';
import type { WorkflowStatus } from '../constants/workflow-data';

const STYLES: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground',
  RUNNING: 'bg-primary/10 text-primary',
  WAITING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-destructive/10 text-destructive',
  CANCELLED: 'bg-muted text-muted-foreground',
  COMPLETED: 'bg-success/10 text-success',
  PAUSED: 'bg-muted text-muted-foreground',
  ESCALATED: 'bg-destructive/10 text-destructive',
  OVERDUE: 'bg-destructive/10 text-destructive',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  FAILED: 'bg-destructive/10 text-destructive',
};

export function WorkflowStatusBadge({ status }: { status: WorkflowStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
