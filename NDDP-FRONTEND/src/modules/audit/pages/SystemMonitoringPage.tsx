import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SERVICE_HEALTH, type ServiceHealth } from '../constants/audit-data';

export function SystemMonitoringPage() {
  const columns: DataTableColumn<ServiceHealth>[] = [
    { key: 'name', header: 'Service', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'avail', header: 'Availability', render: (r) => r.availability },
    { key: 'rt', header: 'Response Time', render: (r) => r.responseTime },
    { key: 'cpu', header: 'CPU', render: (r) => r.cpu },
    { key: 'mem', header: 'Memory', render: (r) => r.memory },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'System Health' }]} title="System Monitoring" description="Service availability, response time, CPU, memory, queues, and database connections" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SERVICE_HEALTH as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
