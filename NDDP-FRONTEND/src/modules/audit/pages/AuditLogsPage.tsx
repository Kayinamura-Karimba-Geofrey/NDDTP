import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetAuditLogsQuery } from '../api/audit.api';
import type { AuditLogRow } from '../constants/audit-data';

export function AuditLogsPage() {
  const { data: rows = [] } = useGetAuditLogsQuery();

  const columns: DataTableColumn<AuditLogRow>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'user', header: 'User', render: (r) => <span className="font-medium">{r.user}</span> },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'action', header: 'Action', render: (r) => r.action },
    { key: 'resource', header: 'Resource', render: (r) => <span className="font-mono text-xs">{r.resource}</span> },
    { key: 'ip', header: 'IP', render: (r) => r.ip ?? '—' },
    { key: 'corr', header: 'Correlation', render: (r) => <span className="font-mono text-xs">{r.correlationId ?? '—'}</span> },
    { key: 'result', header: 'Result', render: (r) => <AuditStatusBadge status={r.result} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Audit Logs' }]} title="Audit Logs" description="Immutable audit records — who did what, when, where, and the result" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
