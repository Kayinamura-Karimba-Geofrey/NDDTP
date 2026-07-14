import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetFacilityUtilitiesQuery } from '../api/facilities.api';
import type { UtilityReading } from '../constants/facilities-data';
import { CreateUtilityReadingModal } from '../components/CreateUtilityReadingModal';

export function FacilitiesUtilitiesPage() {
  const { data: utilities = [], isLoading } = useGetFacilityUtilitiesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Utilities' }]} title="Utilities" description="Electricity, water, and other consumption readings" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Log Utility</Button>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={utilities as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateUtilityReadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
