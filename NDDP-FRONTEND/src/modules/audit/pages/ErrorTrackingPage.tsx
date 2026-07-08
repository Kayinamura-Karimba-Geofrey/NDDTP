import toast from 'react-hot-toast';
import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ERRORS, type ErrorRecord } from '../constants/audit-data';

export function ErrorTrackingPage() {
  const columns: DataTableColumn<ErrorRecord>[] = [
    { key: 'id', header: 'Error ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'exception', header: 'Exception', render: (r) => <code className="text-xs">{r.exception}</code> },
    { key: 'severity', header: 'Severity', render: (r) => <AuditStatusBadge status={r.severity} /> },
    { key: 'corr', header: 'Correlation', render: (r) => <span className="font-mono text-xs">{r.correlationId}</span> },
    { key: 'env', header: 'Environment', render: (r) => r.environment },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Stack trace restricted — request elevated access')}>Inspect</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Errors' }]} title="Error Tracking" description="Centralized errors — exception type, correlation ID, environment, and resolution status. Stack traces are restricted." />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ERRORS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
