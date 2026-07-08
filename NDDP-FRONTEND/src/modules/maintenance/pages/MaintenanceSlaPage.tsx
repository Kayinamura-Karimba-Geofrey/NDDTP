import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SLA, type SlaRule } from '../constants/maintenance-data';

export function MaintenanceSlaPage() {
  const columns: DataTableColumn<SlaRule>[] = [
    { key: 'priority', header: 'Priority', render: (r) => <span className="font-medium">{r.priority}</span> },
    { key: 'response', header: 'Response (hrs)', render: (r) => r.responseHours },
    { key: 'resolution', header: 'Resolution (hrs)', render: (r) => r.resolutionHours },
    { key: 'compliance', header: 'Compliance', render: (r) => r.compliance },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'SLA' }]} title="SLA Rules" description="Response and resolution targets by maintenance priority" />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SLA as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
