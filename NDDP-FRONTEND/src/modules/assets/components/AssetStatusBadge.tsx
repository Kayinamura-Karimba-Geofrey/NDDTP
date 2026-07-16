import { cn } from '@/utils/cn';
import type { AssetStatus } from '../constants/asset-data';

const STYLES: Record<string, string> = {
  REGISTERED: 'bg-muted text-muted-foreground',
  AVAILABLE: 'bg-success/10 text-success',
  ASSIGNED: 'bg-primary/10 text-primary',
  IN_MAINTENANCE: 'bg-warning/10 text-warning',
  UNDER_MAINTENANCE: 'bg-warning/10 text-warning',
  DISPOSED: 'bg-muted text-muted-foreground',
  LOST: 'bg-destructive/10 text-destructive',
  RESERVED: 'bg-primary/10 text-primary',
  RETIRED: 'bg-muted text-muted-foreground',
  DUE_INSPECTION: 'bg-warning/10 text-warning',
  EXPIRED: 'bg-muted text-muted-foreground',
  EXPIRING_SOON: 'bg-warning/10 text-warning',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  COMPLETED: 'bg-success/10 text-success',
  SCHEDULED: 'bg-primary/10 text-primary',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  PASS: 'bg-success/10 text-success',
  FAIL: 'bg-destructive/10 text-destructive',
  ACTIVE: 'bg-success/10 text-success',
};

export function AssetStatusBadge({ status }: { status: AssetStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
