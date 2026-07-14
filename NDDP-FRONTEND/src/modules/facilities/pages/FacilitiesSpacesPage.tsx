import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetFacilitySpacesQuery } from '../api/facilities.api';
import type { FacilitySpace } from '../constants/facilities-data';
import { CreateFacilitySpaceModal } from '../components/CreateFacilitySpaceModal';

export function FacilitiesSpacesPage() {
  const { data: spaces = [], isLoading } = useGetFacilitySpacesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<FacilitySpace>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Space', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'facility', header: 'Facility', render: (r) => r.facility },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'floor', header: 'Floor', render: (r) => r.floor },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity || '—' },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Spaces' }]} title="Spaces" description="Rooms, halls, labs, and storage units" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Space</Button>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={spaces as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateFacilitySpaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
