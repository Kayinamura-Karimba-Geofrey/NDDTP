import { Link } from 'react-router-dom';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitRequestsQuery } from '../api/visitor.api';
import type { VisitRequest } from '../constants/visitor-data';

export function VisitorOnSitePage() {
  const { data: visits = [] } = useGetVisitRequestsQuery();
  const onSite = visits.filter((v) => v.status === 'CHECKED_IN');

  const columns: DataTableColumn<VisitRequest>[] = [
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'host', header: 'Host', render: (r) => r.host },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'badge', header: 'Badge', render: (r) => r.badge ?? '—' },
    { key: 'when', header: 'Since', render: (r) => r.scheduledAt },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/visitors/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'On Site' }]} title="Currently On Site" description="Visitors who have checked in and not yet checked out" />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={onSite as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
