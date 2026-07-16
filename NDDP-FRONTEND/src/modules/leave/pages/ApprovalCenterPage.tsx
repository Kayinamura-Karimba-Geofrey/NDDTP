import { useState } from 'react';
import dayjs from 'dayjs';

import { useGetPendingApprovalsQuery } from '../api/leave.api';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LeaveStatusBadge } from '../components/LeaveStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { ActionLeaveRequestModal } from '../components/ActionLeaveRequestModal';
import type { LeaveRequest } from '../constants/leave-data';

export function ApprovalCenterPage() {
  const { data: pending = [], isLoading } = useGetPendingApprovalsQuery();
  const [selectedRequest, setSelectedRequest] = useState<{ request: LeaveRequest, action: 'APPROVED' | 'REJECTED' | 'MORE_INFO' } | null>(null);

  const columns: DataTableColumn<LeaveRequest>[] = [
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'type', header: 'Leave Type' },
    { key: 'dates', header: 'Dates', render: (r) => `${dayjs(r.startDate).format('MMM D')} – ${dayjs(r.endDate).format('MMM D')}` },
    { key: 'days', header: 'Duration', render: (r) => `${r.totalDays} days` },
    { key: 'reason', header: 'Reason', render: (r) => r.reason ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <LeaveStatusBadge status={r.status} /> },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D') : '—' },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest({ request: r, action: 'APPROVED' })}>Approve</Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest({ request: r, action: 'REJECTED' })}>Reject</Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest({ request: r, action: 'MORE_INFO' })}>Info</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Approval Center' }]} title="Approval Center" description="Review and action pending leave requests" />
      <LeaveSubNav />
      <Card className="mb-4"><CardContent className="pt-4 text-sm text-muted-foreground">Workflow: Submitted → Manager Approved → HR Approved (if required) → Completed</CardContent></Card>
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={pending as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <ActionLeaveRequestModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest?.request || null}
        action={selectedRequest?.action || null}
      />
    </div>
  );
}
