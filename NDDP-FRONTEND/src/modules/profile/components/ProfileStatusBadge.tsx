import { cn } from '@/utils/cn';
import type { ProfileStatus } from '../constants/profile-data';

const STYLES: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  INACTIVE: 'bg-muted text-muted-foreground',
  PENDING: 'bg-warning/10 text-warning',
  SUSPENDED: 'bg-destructive/10 text-destructive',
};

export function ProfileStatusBadge({ status }: { status: ProfileStatus | string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', STYLES[status] ?? 'bg-muted text-muted-foreground')}>
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
