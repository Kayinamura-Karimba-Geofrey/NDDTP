import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SYSTEM_ACTIVITY, type SystemActivityRow } from '../constants/audit-data';

export function SystemActivityPage() {
  const columns: DataTableColumn<SystemActivityRow>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'job', header: 'Job', render: (r) => <span className="font-medium">{r.job}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'duration', header: 'Duration', render: (r) => r.duration },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'System Activity' }]} title="System Activity" description="Scheduled jobs, queues, sync, backups, workflow execution, notifications, and report generation" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SYSTEM_ACTIVITY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
