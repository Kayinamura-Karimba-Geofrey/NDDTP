import { AuditSubNav } from '../components/AuditSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_API_ACTIVITY, type ApiActivityRow } from '../constants/audit-data';

export function ApiActivityPage() {
  const columns: DataTableColumn<ApiActivityRow>[] = [
    { key: 'endpoint', header: 'Endpoint', render: (r) => <code className="text-xs">{r.endpoint}</code> },
    { key: 'method', header: 'Method', render: (r) => r.method },
    { key: 'caller', header: 'Caller', render: (r) => r.caller },
    { key: 'rt', header: 'Response Time', render: (r) => r.responseTime },
    { key: 'code', header: 'Status', render: (r) => r.statusCode },
    { key: 'count', header: 'Requests', render: (r) => r.requestCount.toLocaleString() },
    { key: 'size', header: 'Payload', render: (r) => r.payloadSize },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'API Activity' }]} title="API Activity" description="Endpoint usage — slowest APIs, most used APIs, failed requests, and peak traffic" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_API_ACTIVITY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
