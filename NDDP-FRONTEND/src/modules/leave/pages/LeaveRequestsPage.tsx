import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus, FiDownload, FiPrinter } from 'react-icons/fi';
import { useGetLeaveRequestsQuery } from '../api/leave.api';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LeaveStatusBadge } from '../components/LeaveStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { LeaveRequest } from '../constants/leave-data';

export function LeaveRequestsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetLeaveRequestsQuery({ page: 1, limit: 50, status: statusFilter || undefined });

  const columns: DataTableColumn<LeaveRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'type', header: 'Leave Type' },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('MMM D') },
    { key: 'days', header: 'Duration', render: (r) => `${r.totalDays}d` },
    { key: 'balance', header: 'Balance', render: (r) => r.currentBalance ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <LeaveStatusBadge status={r.status} /> },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D') : '—' },
    { key: 'approver', header: 'Approver', render: (r) => r.approver ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave Requests' }]} title="Leave Requests" description="Manage all leave requests across the organization" actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast('Exporting...')}><FiDownload className="h-4 w-4" /> Export</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}><FiPrinter className="h-4 w-4" /> Print</Button>
          <Link to="/leave/new"><Button><FiPlus className="h-4 w-4" /> Request Leave</Button></Link>
        </div>
      } />
      <LeaveSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CANCELLED', 'DRAFT'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
