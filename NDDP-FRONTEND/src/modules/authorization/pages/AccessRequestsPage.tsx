import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MOCK_ACCESS_REQUESTS } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AccessRequest } from '../constants/authorization-data';

export function AccessRequestsPage() {
  const columns: DataTableColumn<AccessRequest>[] = [
    { key: 'id', header: 'Request ID', render: (r) => <code className="text-xs">{r.id}</code> },
    { key: 'requester', header: 'Requester' },
    { key: 'role', header: 'Requested Role', render: (r) => r.requestedRole },
    { key: 'reason', header: 'Reason' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span className={
          r.status === 'APPROVED' ? 'text-success' : r.status === 'REJECTED' ? 'text-danger' : 'text-warning'
        }>{r.status}</span>
      ),
    },
    { key: 'approver', header: 'Approver', render: (r) => r.approver ?? '—' },
    { key: 'decision', header: 'Decision Date', render: (r) => r.decisionDate ? dayjs(r.decisionDate).format('MMM D, YYYY') : '—' },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => r.status === 'PENDING' ? (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast.success('Approved')}>Approve</Button>
          <Button variant="ghost" size="sm" onClick={() => toast.error('Rejected')}>Reject</Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Access Requests' }]}
        title="Access Requests"
        description="Review and process permission access requests"
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
            rows={MOCK_ACCESS_REQUESTS as unknown as Record<string, unknown>[]}
            rowKey={(r) => String(r.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
