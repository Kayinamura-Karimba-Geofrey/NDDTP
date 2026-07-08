import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_UTILITIES, type UtilityReading } from '../constants/facilities-data';

export function FacilitiesUtilitiesPage() {
  const columns: DataTableColumn<UtilityReading>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'facility', header: 'Facility', render: (r) => <span className="font-medium">{r.facility}</span> },
    { key: 'utility', header: 'Utility', render: (r) => r.utility },
    { key: 'period', header: 'Period', render: (r) => r.period },
    { key: 'consumption', header: 'Consumption', render: (r) => r.consumption },
    { key: 'cost', header: 'Cost', render: (r) => r.cost },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Utilities' }]} title="Utilities" description="Electricity, water, and other consumption readings" />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_UTILITIES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
