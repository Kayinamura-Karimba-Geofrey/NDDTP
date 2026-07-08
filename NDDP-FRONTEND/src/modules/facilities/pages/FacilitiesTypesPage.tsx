import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetFacilityTypesQuery } from '../api/facilities.api';
import type { FacilityTypeRecord } from '../constants/facilities-data';

export function FacilitiesTypesPage() {
  const { data: types = [] } = useGetFacilityTypesQuery();

  const columns: DataTableColumn<FacilityTypeRecord>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Type', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category', render: (r) => r.category },
    { key: 'facilityCount', header: 'Facilities', render: (r) => r.facilityCount },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Types' }]} title="Facility Types" description="Classification categories for buildings and sites" />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={types as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
