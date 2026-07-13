import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetMaintenanceQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { MaintenanceOrder } from '../constants/fleet-data';
import { CreateMaintenanceOrderModal } from '../components/CreateMaintenanceOrderModal';

export function FleetMaintenancePage() {
  const { data: maintenance = [], isLoading } = useGetFleetMaintenanceQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<MaintenanceOrder>[] = [
    { key: 'wo', header: 'Work Order', render: (r) => <code className="text-xs">{r.workOrder}</code> },
    { key: 'vehicle', header: 'Vehicle', render: (r) => <span className="font-medium">{r.vehicle}</span> },
    { key: 'type', header: 'Type' },
    { key: 'provider', header: 'Service Provider' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'cost', header: 'Cost', render: (r) => (r.cost ? `${r.cost.toLocaleString()} RWF` : '—') },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Maintenance' }]} title="Maintenance Coordination" description="Preventive, corrective, and emergency fleet maintenance" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Create Work Order</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={maintenance as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateMaintenanceOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
