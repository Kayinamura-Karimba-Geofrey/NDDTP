import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenanceTechniciansQuery } from '../api/maintenance.api';
import type { Technician } from '../constants/maintenance-data';
import { CreateTechnicianModal } from '../components/CreateTechnicianModal';

export function MaintenanceTechniciansPage() {
  const { data: technicians = [], isLoading } = useGetMaintenanceTechniciansQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<Technician>[] = [
    { key: 'name', header: 'Technician', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'specialty', header: 'Specialty', render: (r) => r.specialty },
    { key: 'open', header: 'Open Orders', render: (r) => r.openOrders },
    { key: 'done', header: 'Completed (Month)', render: (r) => r.completedThisMonth },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Technicians' }]} title="Technicians" description="Assignee capacity and specialty for work order allocation" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Register Technician</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={technicians as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateTechnicianModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
