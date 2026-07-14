import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import type { FacilityRecord } from '../constants/facilities-data';
import { CreateFacilityModal } from '../components/CreateFacilityModal';

export function FacilitiesDirectoryPage() {
  const { data: facilities = [], isLoading } = useGetFacilitiesDirectoryQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<FacilityRecord>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Facility', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'location', header: 'Location', render: (r) => r.location },
    { key: 'floors', header: 'Floors', render: (r) => r.floors },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity },
    { key: 'occupancy', header: 'Occupancy', render: (r) => `${r.occupancy} (${r.capacity ? Math.round((r.occupancy / r.capacity) * 100) : 0}%)` },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/facilities/directory/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Directory' }]} title="Facility Directory" description="Buildings and sites across the estate" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Facility</Button>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={facilities as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateFacilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
