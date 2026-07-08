import toast from 'react-hot-toast';
import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetSecurityEventsQuery } from '../api/audit.api';
import type { SecurityEvent } from '../constants/audit-data';

export function SecurityEventsPage() {
  const { data: rows = [] } = useGetSecurityEventsQuery();

  const columns: DataTableColumn<SecurityEvent>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'type', header: 'Type', render: (r) => <span className="font-medium">{r.type}</span> },
    { key: 'severity', header: 'Severity', render: (r) => <AuditStatusBadge status={r.severity} /> },
    { key: 'user', header: 'User', render: (r) => r.user ?? '—' },
    { key: 'source', header: 'Source', render: (r) => r.source },
    { key: 'summary', header: 'Summary', render: (r) => r.summary },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Event marked resolved')}>Resolve</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Security Events' }]} title="Security Events" description="Failed logins, privilege escalation, unauthorized access, token misuse, and related threats" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
