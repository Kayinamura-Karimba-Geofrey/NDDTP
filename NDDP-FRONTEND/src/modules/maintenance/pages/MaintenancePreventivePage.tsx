import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenancePreventiveQuery } from '../api/maintenance.api';
import type { PreventiveSchedule } from '../constants/maintenance-data';
import { CreatePreventiveScheduleModal } from '../components/CreatePreventiveScheduleModal';

export function MaintenancePreventivePage() {
  const { data: preventive = [], isLoading } = useGetMaintenancePreventiveQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PreventiveSchedule>[] = [
    { key: 'asset', header: 'Asset', render: (r) => <span className="font-medium">{r.asset}</span> },
    { key: 'freq', header: 'Frequency', render: (r) => r.frequency },
    { key: 'next', header: 'Next Due', render: (r) => r.nextDue },
    { key: 'last', header: 'Last Completed', render: (r) => r.lastCompleted ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => <Button size="sm" variant="outline" onClick={() => toast(`Generated WO for ${r.asset}`)}>Generate WO</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Preventive' }]} title="Preventive Maintenance" description="Recurring schedules for generators, HVAC, elevators, and fleet assets" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Schedule</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={preventive as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreatePreventiveScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
