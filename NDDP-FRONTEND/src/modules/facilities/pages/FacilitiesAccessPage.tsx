import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetFacilityAccessZonesQuery } from '../api/facilities.api';
import type { AccessZone } from '../constants/facilities-data';
import { CreateAccessZoneModal } from '../components/CreateAccessZoneModal';

export function FacilitiesAccessPage() {
  const { data: access = [], isLoading } = useGetFacilityAccessZonesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Access' }]} title="Access Control" description="Restricted zones and credential coverage by facility" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Establish Zone</Button>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={access as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateAccessZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
