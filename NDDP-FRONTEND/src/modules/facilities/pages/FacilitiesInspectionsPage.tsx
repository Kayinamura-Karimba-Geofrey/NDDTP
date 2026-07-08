import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_INSPECTIONS, type FacilityInspection } from '../constants/facilities-data';

export function FacilitiesInspectionsPage() {
  const columns: DataTableColumn<FacilityInspection>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'facility', header: 'Facility', render: (r) => <span className="font-medium">{r.facility}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'scheduledAt', header: 'Scheduled', render: (r) => r.scheduledAt },
    { key: 'inspector', header: 'Inspector', render: (r) => r.inspector },
    { key: 'findings', header: 'Findings', render: (r) => r.findings },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Inspections' }]} title="Inspections" description="Fire safety, structural, and HSE facility inspections" />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INSPECTIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
