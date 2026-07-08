import toast from 'react-hot-toast';
import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMonitoringAlertsQuery } from '../api/audit.api';
import type { AlertItem } from '../constants/audit-data';

export function AlertCenterPage() {
  const { data: rows = [] } = useGetMonitoringAlertsQuery();

  const columns: DataTableColumn<AlertItem>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'title', header: 'Alert', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'severity', header: 'Severity', render: (r) => <AuditStatusBadge status={r.severity} /> },
    { key: 'source', header: 'Source', render: (r) => r.source },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => toast('Alert acknowledged')}>Ack</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Alert assigned')}>Assign</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Alert escalated')}>Escalate</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Alert resolved')}>Resolve</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Alerts' }]} title="Alert Center" description="Real-time alerts — database, service health, CPU, queues, backups, and suspicious activity" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
