import { cn } from '@/utils/cn';
import type { AuditStatus } from '../constants/audit-data';

const STYLES: Record<string, string> = {
  SUCCESS: 'bg-success/10 text-success',
  FAILURE: 'bg-destructive/10 text-destructive',
  PENDING: 'bg-warning/10 text-warning',
  OPEN: 'bg-warning/10 text-warning',
  ACKNOWLEDGED: 'bg-primary/10 text-primary',
  ASSIGNED: 'bg-primary/10 text-primary',
  ESCALATED: 'bg-destructive/10 text-destructive',
  RESOLVED: 'bg-success/10 text-success',
  CLOSED: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  CRITICAL: 'bg-destructive/10 text-destructive',
  HIGH: 'bg-destructive/10 text-destructive',
  MEDIUM: 'bg-warning/10 text-warning',
  LOW: 'bg-muted text-muted-foreground',
  INFO: 'bg-primary/10 text-primary',
  COMPLIANT: 'bg-success/10 text-success',
  NON_COMPLIANT: 'bg-destructive/10 text-destructive',
  WARNING: 'bg-warning/10 text-warning',
};

export function AuditStatusBadge({ status }: { status: AuditStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
