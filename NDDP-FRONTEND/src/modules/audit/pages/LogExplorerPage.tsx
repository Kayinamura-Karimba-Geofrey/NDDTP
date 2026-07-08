import toast from 'react-hot-toast';
import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetAuditLogsQuery } from '../api/audit.api';
import type { AuditLogRow } from '../constants/audit-data';

export function LogExplorerPage() {
  const { data: rows = [] } = useGetAuditLogsQuery();

  const columns: DataTableColumn<AuditLogRow>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'user', header: 'User', render: (r) => r.user },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'action', header: 'Action', render: (r) => r.action },
    { key: 'resource', header: 'Resource', render: (r) => r.resource },
    { key: 'ip', header: 'IP', render: (r) => r.ip ?? '—' },
    { key: 'corr', header: 'Correlation ID', render: (r) => <span className="font-mono text-xs">{r.correlationId ?? '—'}</span> },
    { key: 'result', header: 'Result', render: (r) => <AuditStatusBadge status={r.result} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Log Explorer' }]} title="Log Explorer" description="Full-text search across logs with filters for service, user, severity, correlation ID, IP, endpoint, and action" actions={<Button variant="outline" onClick={() => toast('Search saved')}>Save Search</Button>} />
      <AuditSubNav />
      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input label="Search" placeholder="Full-text search…" />
        <Input label="Service" placeholder="All services" />
        <Input label="Correlation ID" placeholder="corr-…" />
        <Input label="IP Address" placeholder="10.x.x.x" />
      </div>
      <div className="mb-4 flex gap-2">
        <Button size="sm" onClick={() => toast('Search executed')}>Search</Button>
        <Button size="sm" variant="outline" onClick={() => toast('Export queued')}>Export</Button>
      </div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
