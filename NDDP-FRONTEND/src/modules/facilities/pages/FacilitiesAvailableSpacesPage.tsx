import { Link } from 'react-router-dom';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetAvailableSpacesQuery } from '../api/facilities.api';
import type { FacilitySpace } from '../constants/facilities-data';

export function FacilitiesAvailableSpacesPage() {
  const { data: spaces = [] } = useGetAvailableSpacesQuery();

  const columns: DataTableColumn<FacilitySpace>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Space', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'facility', header: 'Facility', render: (r) => r.facility },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'floor', header: 'Floor', render: (r) => r.floor },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity || '—' },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: () => <Link to="/facilities/bookings/new"><Button size="sm">Book</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Available Spaces' }]} title="Available Spaces" description="Spaces ready for booking right now" />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={spaces as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
