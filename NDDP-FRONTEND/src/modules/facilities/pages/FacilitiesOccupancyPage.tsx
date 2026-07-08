import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import { SPACE_STATUS_BREAKDOWN, type FacilityRecord } from '../constants/facilities-data';

export function FacilitiesOccupancyPage() {
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();

  const columns: DataTableColumn<FacilityRecord>[] = [
    { key: 'name', header: 'Facility', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity },
    { key: 'occupancy', header: 'Current', render: (r) => r.occupancy },
    { key: 'rate', header: 'Rate', render: (r) => `${r.capacity ? Math.round((r.occupancy / r.capacity) * 100) : 0}%` },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Occupancy' }]} title="Occupancy" description="Capacity utilization across facilities and spaces" />
      <FacilitiesSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SPACE_STATUS_BREAKDOWN.map((s) => (
          <Card key={s.name}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{s.name}</p><p className="mt-1 text-2xl font-bold">{s.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Facility occupancy</CardTitle></CardHeader>
        <CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={facilities as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent>
      </Card>
    </div>
  );
}
