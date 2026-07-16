import { Link } from 'react-router-dom';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetWorkOrdersQuery } from '../api/maintenance.api';
import type { WorkOrder } from '../constants/maintenance-data';

export function MaintenanceAssetsPage() {
  const { data: orders = [] } = useGetWorkOrdersQuery();

  const columns: DataTableColumn<WorkOrder>[] = [
    { key: 'asset', header: 'Asset', render: (r) => <span className="font-medium">{r.asset}</span> },
    { key: 'title', header: 'Latest Work', render: (r) => r.title },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/maintenance/work-orders/${r.id}`}><Button size="sm" variant="outline">Open WO</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Assets' }]} title="Maintained Assets" description="Vehicles, facilities, and equipment referenced by open and recent work orders" />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={orders as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
