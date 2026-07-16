import { cn } from '@/utils/cn';
import type { SearchStatus, QueryStatus } from '../constants/search-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  INDEXED: 'bg-success/10 text-success',
  FAILED: 'bg-destructive/10 text-destructive',
  DELETED: 'bg-muted text-muted-foreground',
  COMPLETED: 'bg-success/10 text-success',
  DRAFT: 'bg-muted text-muted-foreground',
};

export function SearchStatusBadge({ status }: { status: SearchStatus | QueryStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
