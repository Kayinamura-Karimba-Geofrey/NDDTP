import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetLogisticsLocationsQuery } from '../api/logistics.api';
import type { LogisticsLocation } from '../constants/logistics-data';

export function LogisticsLocationsPage() {
  const { data: locations = [] } = useGetLogisticsLocationsQuery();

  const columns: DataTableColumn<LogisticsLocation>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: 'name', header: 'Location', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'address', header: 'Address', render: (r) => r.address },
    { key: 'status', header: 'Status', render: (r) => <LogisticsStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Locations' }]} title="Locations" description="Depots, bases, warehouses, checkpoints, and staging points" />
      <LogisticsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={locations as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
