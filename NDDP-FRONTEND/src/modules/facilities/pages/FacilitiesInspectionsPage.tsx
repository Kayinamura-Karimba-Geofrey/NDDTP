import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetFacilityInspectionsQuery } from '../api/facilities.api';
import type { FacilityInspection } from '../constants/facilities-data';
import { CreateFacilityInspectionModal } from '../components/CreateFacilityInspectionModal';

export function FacilitiesInspectionsPage() {
  const { data: inspections = [], isLoading } = useGetFacilityInspectionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Inspections' }]} title="Inspections" description="Fire safety, structural, and HSE facility inspections" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Log Inspection</Button>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={inspections as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateFacilityInspectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
