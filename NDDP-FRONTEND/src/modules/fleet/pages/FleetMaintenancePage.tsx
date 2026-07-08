import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_MAINTENANCE, type MaintenanceOrder } from '../constants/fleet-data';

export function FleetMaintenancePage() {
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
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Maintenance' }]} title="Maintenance Coordination" description="Preventive, corrective, and emergency fleet maintenance" actions={<Button onClick={() => toast('Create work order')}><FiPlus className="h-4 w-4" /> Create Work Order</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_MAINTENANCE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
