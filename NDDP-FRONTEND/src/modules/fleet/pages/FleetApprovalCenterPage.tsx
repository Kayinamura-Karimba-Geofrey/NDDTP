import dayjs from 'dayjs';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_APPROVALS, type FleetApproval } from '../constants/fleet-data';

export function FleetApprovalCenterPage() {
  const columns: DataTableColumn<FleetApproval>[] = [
    { key: 'type', header: 'Type' },
    { key: 'ref', header: 'Reference', render: (r) => <code className="text-xs">{r.reference}</code> },
    { key: 'requester', header: 'Requester' },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submittedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
    { key: 'actions', header: '', render: () => <Button size="sm" variant="outline">Review</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Trip requests, assignments, emergency transport, fuel exceptions, maintenance" />
      <FleetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_APPROVALS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
