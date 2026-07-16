import { Badge } from '@/components/ui';
import { cn } from '@/utils/cn';

interface ServiceStatusBadgeProps {
  status: 'up' | 'down' | 'healthy' | 'degraded' | 'maintenance' | 'ok' | 'success' | 'failed' | 'in_progress' | 'rolled_back';
  className?: string;
}

const VARIANT_MAP: Record<ServiceStatusBadgeProps['status'], 'success' | 'danger' | 'warning' | 'secondary' | 'default'> = {
  up: 'success',
  down: 'danger',
  healthy: 'success',
  ok: 'success',
  success: 'success',
  degraded: 'warning',
  maintenance: 'warning',
  in_progress: 'warning',
  rolled_back: 'warning',
  failed: 'danger',
};

const LABEL_MAP: Record<ServiceStatusBadgeProps['status'], string> = {
  up: 'Online',
  down: 'Offline',
  healthy: 'Healthy',
  ok: 'Healthy',
  success: 'Success',
  degraded: 'Degraded',
  maintenance: 'Maintenance',
  in_progress: 'In Progress',
  rolled_back: 'Rolled Back',
  failed: 'Failed',
};

export function ServiceStatusBadge({ status, className }: ServiceStatusBadgeProps) {
  return (
    <Badge variant={VARIANT_MAP[status]} className={cn(className)}>
      {LABEL_MAP[status]}
    </Badge>
  );
}
