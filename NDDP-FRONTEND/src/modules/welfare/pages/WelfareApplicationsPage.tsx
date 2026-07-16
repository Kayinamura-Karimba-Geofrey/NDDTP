import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetWelfareApplicationsQuery } from '../api/welfare.api';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { WelfareApplication } from '../constants/welfare-data';

export function WelfareApplicationsPage() {
  const { data: applications = [], isLoading } = useGetWelfareApplicationsQuery();

  const columns: DataTableColumn<WelfareApplication>[] = [
    { key: 'num', header: 'Application #', render: (r) => <code className="text-xs">{r.applicationNumber}</code> },
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'program', header: 'Program' },
    { key: 'submitted', header: 'Submitted', render: (r) => dayjs(r.submittedAt).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'officer', header: 'Officer', render: (r) => r.assignedOfficer ?? '—' },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`View ${r.applicationNumber}`)}>View</Button>
        {r.status === 'PENDING' && <Button variant="ghost" size="sm" onClick={() => toast('Withdrawn')}>Withdraw</Button>}
        <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Applications' }]} title="Welfare Applications" description="Track employee welfare program applications" />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={applications as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
