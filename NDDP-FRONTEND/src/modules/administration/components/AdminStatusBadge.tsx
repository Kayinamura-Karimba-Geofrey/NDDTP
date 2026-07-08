import { cn } from '@/utils/cn';
import type { AdminStatus } from '../constants/administration-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-warning/10 text-warning',
  DEPRECATED: 'bg-muted text-muted-foreground',
  HEALTHY: 'bg-success/10 text-success',
  DEGRADED: 'bg-warning/10 text-warning',
};

export function AdminStatusBadge({ status }: { status: AdminStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
