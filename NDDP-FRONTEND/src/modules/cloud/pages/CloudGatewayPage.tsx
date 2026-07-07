import { FiRefreshCw } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { CloudSubNav } from '../components/CloudSubNav';
import { ServiceStatusBadge } from '../components/ServiceStatusBadge';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle, Button, Skeleton, Alert } from '@/components/ui';
import { useGetGatewayHealthQuery, useGetGatewayInfoQuery } from '../api/cloud.api';
import type { GatewayServiceRoute } from '../api/cloud.api';

export function CloudGatewayPage() {
  const { data: health, isLoading: healthLoading, refetch: refetchHealth } = useGetGatewayHealthQuery();
  const { data: info, isLoading: infoLoading, refetch: refetchInfo, isError } = useGetGatewayInfoQuery();

  const isLoading = healthLoading || infoLoading;

  const columns: DataTableColumn<GatewayServiceRoute>[] = [
    { key: 'label', header: 'Service' },
    { key: 'key', header: 'Route Key', className: 'font-mono text-xs' },
    { key: 'port', header: 'Port' },
    { key: 'path', header: 'Gateway Path', className: 'font-mono text-xs' },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Cloud Platform', path: '/cloud' }, { label: 'API Gateway' }]}
        title="API Gateway"
        description="Central cloud entry point routing requests to all NDDTP microservices."
        actions={
          <Button variant="outline" size="sm" onClick={() => { refetchHealth(); refetchInfo(); }}>
            <FiRefreshCw className="h-4 w-4" /> Refresh
          </Button>
        }
      />
      <CloudSubNav />

      {isError && (
        <Alert variant="warning" title="Gateway unavailable" className="mb-6">
          Start the API gateway with <code>npm run gateway:dev</code> in NDDP-BACKEND.
        </Alert>
      )}

      {isLoading ? (
        <Skeleton className="mb-6 h-32 rounded-xl" />
      ) : health && (
        <Card className="mb-6">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Gateway Status</CardTitle>
              <ServiceStatusBadge status={health.status === 'ok' ? 'ok' : 'degraded'} />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Service</dt>
                <dd className="mt-1 font-medium text-foreground">{health.service}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Version</dt>
                <dd className="mt-1 font-medium text-foreground">{health.version}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Routes</dt>
                <dd className="mt-1 font-medium text-foreground">{health.routes}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Prefix</dt>
                <dd className="mt-1 font-mono text-sm text-foreground">{info?.prefix ?? '/api/svc'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle>Registered Routes</CardTitle>
          <p className="text-sm text-muted-foreground">{info?.upstreamPattern}</p>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <DataTable
              columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
              rows={(info?.services ?? []) as unknown as Record<string, unknown>[]}
              rowKey={(row) => String(row.key)}
              emptyMessage="No routes configured"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
