import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { type Application } from '../constants/recruitment-data';
import { useGetApplicationsQuery } from '../api/recruitment.api';

export function ShortlistingPage() {
  const { data: appsData, isLoading } = useGetApplicationsQuery({ limit: 100 });
  const shortlisted = (appsData?.data || []).filter((a) => ['SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(a.status));

  const columns: DataTableColumn<Application>[] = [
    { key: 'rank', header: '#', render: (_, i) => (i ?? 0) + 1 },
    { key: 'name', header: 'Candidate', render: (a) => <span className="font-medium">{a.candidateName}</span> },
    { key: 'pos', header: 'Position' },
    { key: 'status', header: 'Status', render: (a) => <RecruitmentStatusBadge status={a.status} /> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Move to interview')}>Interview</Button>
        <Button variant="ghost" size="sm" onClick={() => toast.error('Rejected')}>Reject</Button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Shortlisting' }]} title="Shortlisting" description="Screened candidates ready for interview stage" actions={<Button onClick={() => toast('Bulk shortlist')}>Bulk Shortlist</Button>} />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={shortlisted as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}
