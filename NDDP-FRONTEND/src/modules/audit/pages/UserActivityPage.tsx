import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_USER_ACTIVITY, type UserActivityRow } from '../constants/audit-data';

export function UserActivityPage() {
  const columns: DataTableColumn<UserActivityRow>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'user', header: 'User', render: (r) => <span className="font-medium">{r.user}</span> },
    { key: 'activity', header: 'Activity', render: (r) => r.activity },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'details', header: 'Details', render: (r) => r.details },
    { key: 'result', header: 'Result', render: (r) => <AuditStatusBadge status={r.result} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'User Activity' }]} title="User Activity" description="Login, logout, approvals, downloads, exports, and record changes across the platform" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_USER_ACTIVITY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
