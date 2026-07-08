import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_INFRA, type InfraResource } from '../constants/audit-data';

export function InfrastructureMonitoringPage() {
  const columns: DataTableColumn<InfraResource>[] = [
    { key: 'name', header: 'Resource', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'health', header: 'Health', render: (r) => r.health },
    { key: 'details', header: 'Details', render: (r) => r.details },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Infrastructure' }]} title="Infrastructure Monitoring" description="Docker containers, databases, Redis, message brokers, storage, and network connectivity" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INFRA as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
