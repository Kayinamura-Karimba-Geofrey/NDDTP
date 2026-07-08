import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_ACCESS, type AccessZone } from '../constants/facilities-data';

export function FacilitiesAccessPage() {
  const columns: DataTableColumn<AccessZone>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Zone', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'facility', header: 'Facility', render: (r) => r.facility },
    { key: 'clearance', header: 'Clearance', render: (r) => r.clearance },
    { key: 'activeCredentials', header: 'Active Credentials', render: (r) => r.activeCredentials },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Access' }]} title="Access Control" description="Restricted zones and credential coverage by facility" />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ACCESS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
