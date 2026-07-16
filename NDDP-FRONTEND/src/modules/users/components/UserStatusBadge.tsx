import { cn } from '@/utils/cn';
import type { UserLifecycleStatus } from '../constants/users-data';

const STYLES: Record<UserLifecycleStatus, string> = {
  ACTIVE: 'bg-success/10 text-success',
  PENDING: 'bg-warning/10 text-warning',
  INACTIVE: 'bg-muted text-muted-foreground',
  SUSPENDED: 'bg-danger/10 text-danger',
  ARCHIVED: 'bg-muted text-muted-foreground',
  RETIRED: 'bg-muted text-muted-foreground',
  TERMINATED: 'bg-danger/10 text-danger',
};

export function UserStatusBadge({ status }: { status: UserLifecycleStatus | string }) {
  const style = STYLES[status as UserLifecycleStatus] ?? 'bg-muted text-muted-foreground';
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', style)}>
      {status}
    </span>
  );
}
