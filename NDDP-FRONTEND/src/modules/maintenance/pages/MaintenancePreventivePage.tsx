import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PREVENTIVE, type PreventiveSchedule } from '../constants/maintenance-data';

export function MaintenancePreventivePage() {
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
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Preventive' }]} title="Preventive Maintenance" description="Recurring schedules for generators, HVAC, elevators, and fleet assets" />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PREVENTIVE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
