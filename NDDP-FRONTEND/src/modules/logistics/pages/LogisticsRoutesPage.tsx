import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetTransportRoutesQuery } from '../api/logistics.api';
import type { TransportRoute } from '../constants/logistics-data';

export function LogisticsRoutesPage() {
  const { data: routes = [] } = useGetTransportRoutesQuery();

  const columns: DataTableColumn<TransportRoute>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: 'name', header: 'Route', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'origin', header: 'Origin', render: (r) => r.origin },
    { key: 'destination', header: 'Destination', render: (r) => r.destination },
    { key: 'mode', header: 'Mode', render: (r) => r.transportMode },
    { key: 'distance', header: 'Distance', render: (r) => `${r.distanceKm} km` },
    { key: 'eta', header: 'Est. Hours', render: (r) => r.estimatedHours },
    { key: 'status', header: 'Status', render: (r) => <LogisticsStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Routes' }]} title="Transport Routes" description="Approved corridors and mode options between locations" />
      <LogisticsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={routes as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
