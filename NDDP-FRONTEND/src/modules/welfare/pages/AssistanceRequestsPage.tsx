import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus, FiDownload } from 'react-icons/fi';
import { useGetAssistanceRequestsQuery } from '../api/welfare.api';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssistanceRequest } from '../constants/welfare-data';

export function AssistanceRequestsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetAssistanceRequestsQuery({ page: 1, limit: 50 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<AssistanceRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'type', header: 'Assistance Type' },
    { key: 'program', header: 'Program' },
    { key: 'amount', header: 'Amount', render: (r) => r.amountRequested ? `RWF ${r.amountRequested.toLocaleString()}` : '—' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D') : '—' },
    { key: 'officer', header: 'Officer', render: (r) => r.assignedOfficer ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Assistance' }]} title="Assistance Requests" description="Employee welfare assistance requests" actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast('Exporting...')}><FiDownload className="h-4 w-4" /> Export</Button>
          <Link to="/welfare/assistance/new"><Button><FiPlus className="h-4 w-4" /> New Request</Button></Link>
        </div>
      } />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'PENDING', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
