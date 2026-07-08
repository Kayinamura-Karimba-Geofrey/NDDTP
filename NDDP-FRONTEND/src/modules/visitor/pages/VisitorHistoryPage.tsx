import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetCheckInLogsQuery } from '../api/visitor.api';
import type { CheckInLog } from '../constants/visitor-data';

export function VisitorHistoryPage() {
  const { data: logs = [] } = useGetCheckInLogsQuery();

  const columns: DataTableColumn<CheckInLog>[] = [
    { key: 'time', header: 'Timestamp', render: (r) => r.timestamp },
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'type', header: 'Action', render: (r) => <VisitorStatusBadge status={r.type === 'CHECK_IN' ? 'CHECKED_IN' : 'CHECKED_OUT'} /> },
    { key: 'visit', header: 'Visit ID', render: (r) => <span className="font-mono text-xs">{r.visitId}</span> },
    { key: 'officer', header: 'Officer', render: (r) => r.officer },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'History' }]} title="Visit History" description="Immutable check-in and check-out audit trail across sites" />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={logs as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
