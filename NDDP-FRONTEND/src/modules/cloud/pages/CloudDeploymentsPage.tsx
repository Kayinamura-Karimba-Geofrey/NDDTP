import { PageHeader } from '@/components/shared/PageHeader';
import { CloudSubNav } from '../components/CloudSubNav';
import { ServiceStatusBadge } from '../components/ServiceStatusBadge';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { RECENT_DEPLOYMENTS } from '@/constants/cloud-data';
import type { CloudDeployment } from '@/constants/cloud-data';
import dayjs from 'dayjs';

export function CloudDeploymentsPage() {
  const columns: DataTableColumn<CloudDeployment>[] = [
    { key: 'service', header: 'Service' },
    { key: 'environment', header: 'Environment' },
    { key: 'version', header: 'Version', className: 'font-mono text-xs' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <ServiceStatusBadge status={row.status} />,
    },
    { key: 'deployedBy', header: 'Deployed By' },
    {
      key: 'deployedAt',
      header: 'Deployed At',
      render: (row) => dayjs(row.deployedAt).format('MMM D, YYYY HH:mm'),
    },
    { key: 'duration', header: 'Duration' },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Cloud Platform', path: '/cloud' }, { label: 'Deployments' }]}
        title="Cloud Deployments"
        description="Deployment history across production, staging, and development environments."
      />
      <CloudSubNav />

      <DataTable
        columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
        rows={RECENT_DEPLOYMENTS as unknown as Record<string, unknown>[]}
        rowKey={(row) => String(row.id)}
        emptyMessage="No deployments recorded"
      />
    </div>
  );
}
