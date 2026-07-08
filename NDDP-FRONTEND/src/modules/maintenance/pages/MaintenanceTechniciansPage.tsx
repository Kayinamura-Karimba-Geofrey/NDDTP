import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_TECHNICIANS, type Technician } from '../constants/maintenance-data';

export function MaintenanceTechniciansPage() {
  const columns: DataTableColumn<Technician>[] = [
    { key: 'name', header: 'Technician', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'specialty', header: 'Specialty', render: (r) => r.specialty },
    { key: 'open', header: 'Open Orders', render: (r) => r.openOrders },
    { key: 'done', header: 'Completed (Month)', render: (r) => r.completedThisMonth },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Technicians' }]} title="Technicians" description="Assignee capacity and specialty for work order allocation" />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TECHNICIANS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
