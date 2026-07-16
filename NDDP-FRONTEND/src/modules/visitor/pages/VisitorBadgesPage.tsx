import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_BADGES, type VisitorBadge } from '../constants/visitor-data';

export function VisitorBadgesPage() {
  const columns: DataTableColumn<VisitorBadge>[] = [
    { key: 'id', header: 'Badge', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'visit', header: 'Visit ID', render: (r) => r.visitId },
    { key: 'issued', header: 'Issued', render: (r) => r.issuedAt },
    { key: 'expires', header: 'Expires', render: (r) => r.expiresAt },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Badges' }]} title="Visitor Badges" description="Temporary access badges issued at check-in with expiry controls" />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BADGES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
