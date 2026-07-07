import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetMyLeaveBalancesQuery, useGetLeaveRequestsQuery } from '../api/leave.api';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LeaveStatusBadge } from '../components/LeaveStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { LeaveRequest } from '../constants/leave-data';

export function MyLeavePage() {
  const { data: balances = [] } = useGetMyLeaveBalancesQuery();
  const { data: requests } = useGetLeaveRequestsQuery({ page: 1, limit: 20, mine: true });
  const myRequests = requests?.data ?? [];
  const upcoming = myRequests.filter((r) => ['PENDING_APPROVAL', 'APPROVED'].includes(r.status) && dayjs(r.startDate).isAfter(dayjs()));

  const columns: DataTableColumn<LeaveRequest>[] = [
    { key: 'type', header: 'Leave Type', render: (r) => r.leaveTypeName },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('MMM D, YYYY') },
    { key: 'days', header: 'Working Days', render: (r) => r.totalDays },
    { key: 'status', header: 'Status', render: (r) => <LeaveStatusBadge status={r.status} /> },
    { key: 'approver', header: 'Approver', render: (r) => r.approver ?? '—' },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D, YYYY') : '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'My Leave' }]} title="My Leave" description="Your leave balances, upcoming leave, and history" actions={<Link to="/leave/new"><Button><FiPlus className="h-4 w-4" /> Request Leave</Button></Link>} />
      <LeaveSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {balances.map((b) => (
          <Card key={b.id}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">{b.leaveTypeName}</p>
              <p className="mt-1 text-3xl font-bold">{b.availableDays}</p>
              <p className="text-xs text-muted-foreground">days remaining of {b.totalDays}</p>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Used: {b.usedDays}</span>
                <span>Pending: {b.pendingDays}</span>
              </div>
              {b.expiryDate && <p className="mt-2 text-xs text-warning">Expires {dayjs(b.expiryDate).format('MMM D, YYYY')}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      {upcoming.length > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-semibold">Upcoming Leave</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((r) => (
                <div key={r.id} className="rounded-lg border border-border p-4">
                  <div className="flex justify-between"><span className="font-medium">{r.leaveTypeName}</span><LeaveStatusBadge status={r.status} /></div>
                  <p className="mt-1 text-sm text-muted-foreground">{dayjs(r.startDate).format('MMM D')} – {dayjs(r.endDate).format('MMM D, YYYY')} · {r.totalDays} days</p>
                  <p className="text-xs text-muted-foreground">Approver: {r.approver ?? '—'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold">Recent Leave History</h3>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={myRequests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}
