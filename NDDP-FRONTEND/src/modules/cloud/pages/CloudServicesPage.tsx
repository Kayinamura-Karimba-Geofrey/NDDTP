import { FiRefreshCw } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { CloudSubNav } from '../components/CloudSubNav';
import { ServiceStatusBadge } from '../components/ServiceStatusBadge';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Skeleton, Alert } from '@/components/ui';
import { useGetServicesHealthQuery } from '../api/cloud.api';
import type { ServiceHealthCheck } from '../api/cloud.api';

export function CloudServicesPage() {
  const { data, isLoading, isError, refetch, isFetching } = useGetServicesHealthQuery(undefined, {
    pollingInterval: 30000,
  });

  const columns: DataTableColumn<ServiceHealthCheck>[] = [
    { key: 'label', header: 'Service' },
    { key: 'key', header: 'Key', className: 'font-mono text-xs' },
    { key: 'port', header: 'Port' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <ServiceStatusBadge status={row.status} />,
    },
    {
      key: 'statusCode',
      header: 'HTTP',
      render: (row) => row.statusCode ?? '—',
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Cloud Platform', path: '/cloud' }, { label: 'Microservices' }]}
        title="Microservices Registry"
        description="Live health status for all 35 cloud-hosted NDDTP microservices via the API gateway."
        actions={
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <FiRefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        }
        meta={data && (
          <ServiceStatusBadge status={data.status === 'ok' ? 'ok' : data.status === 'degraded' ? 'degraded' : 'down'} />
        )}
      />
      <CloudSubNav />

      {isError && (
        <Alert variant="warning" title="Unable to fetch service health" className="mb-6">
          Ensure the API gateway is running at port 3000 and core services are started.
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
          rows={(data?.services ?? []) as unknown as Record<string, unknown>[]}
          rowKey={(row) => String(row.key)}
          emptyMessage="No services registered"
        />
      )}

      {data && (
        <p className="mt-4 text-sm text-muted-foreground">
          Last checked: {new Date(data.timestamp).toLocaleString()} · {data.summary.up} online, {data.summary.down} offline
        </p>
      )}
    </div>
  );
}
