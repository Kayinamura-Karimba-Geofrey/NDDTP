import { Card, CardContent, CardHeader, CardTitle, Skeleton, Alert } from '@/components/ui';
import { ServiceStatusBadge } from '@/modules/cloud/components/ServiceStatusBadge';
import { useGetGatewayHealthQuery, useGetServicesHealthQuery } from '@/modules/cloud/api/cloud.api';

export function SystemHealthPanel() {
  const { data: gateway, isLoading: gLoading } = useGetGatewayHealthQuery();
  const { data: services, isLoading: sLoading, isError } = useGetServicesHealthQuery(undefined, { pollingInterval: 60000 });

  if (isLoading(gLoading, sLoading)) {
    return <Skeleton className="h-48 rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">System Health</CardTitle>
        <p className="text-xs text-muted-foreground">Platform infrastructure status</p>
      </CardHeader>
      <CardContent className="pt-4">
        {isError ? (
          <Alert variant="warning" title="Gateway offline">Start API gateway on port 3000 for live health data.</Alert>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <HealthItem label="API Gateway" status={gateway?.status === 'ok' ? 'up' : 'down'} />
            <HealthItem label="Auth Service" status={getServiceStatus(services?.services, 'auth')} />
            <HealthItem label="Personnel Service" status={getServiceStatus(services?.services, 'personnel')} />
            <HealthItem label="Notification Service" status={getServiceStatus(services?.services, 'notification')} />
            <HealthItem label="Inventory Service" status={getServiceStatus(services?.services, 'inventory')} />
            <HealthItem label="Database" status="up" />
            <HealthItem label="Message Broker" status="up" />
            <HealthItem label="Storage / Backup" status="up" />
          </div>
        )}
        {services && (
          <p className="mt-4 text-xs text-muted-foreground">
            {services.summary.up} of {services.summary.total} microservices online
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function HealthItem({ label, status }: { label: string; status: 'up' | 'down' }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <ServiceStatusBadge status={status} />
    </div>
  );
}

function getServiceStatus(services: { key: string; status: string }[] | undefined, key: string): 'up' | 'down' {
  const svc = services?.find((s) => s.key === key);
  return svc?.status === 'up' ? 'up' : 'down';
}

function isLoading(...flags: boolean[]) {
  return flags.some(Boolean);
}
