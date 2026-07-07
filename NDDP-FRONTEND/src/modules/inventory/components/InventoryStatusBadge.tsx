import { cn } from '@/utils/cn';
import type { InventoryStatus } from '../constants/inventory-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  MAINTENANCE: 'bg-warning/10 text-warning',
  PENDING: 'bg-warning/10 text-warning',
  APPROVED: 'bg-primary/10 text-primary',
  REJECTED: 'bg-destructive/10 text-destructive',
  FULFILLED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  COMPLETED: 'bg-success/10 text-success',
  IN_PROGRESS: 'bg-warning/10 text-warning',
  IN_TRANSIT: 'bg-primary/10 text-primary',
  LOW_STOCK: 'bg-warning/10 text-warning',
  OUT_OF_STOCK: 'bg-destructive/10 text-destructive',
  IN_STOCK: 'bg-success/10 text-success',
  EXPIRING_SOON: 'bg-warning/10 text-warning',
  EXPIRED: 'bg-destructive/10 text-destructive',
  DISPATCHED: 'bg-primary/10 text-primary',
  RECEIVED: 'bg-success/10 text-success',
  DRAFT: 'bg-muted text-muted-foreground',
  VARIANCE: 'bg-warning/10 text-warning',
};

export function InventoryStatusBadge({ status }: { status: InventoryStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
