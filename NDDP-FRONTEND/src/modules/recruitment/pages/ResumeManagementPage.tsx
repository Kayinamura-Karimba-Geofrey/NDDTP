import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { type Candidate } from '../constants/recruitment-data';
import { useGetCandidatesQuery } from '../api/recruitment.api';

export function ResumeManagementPage() {
  const { data: candidates = [], isLoading } = useGetCandidatesQuery();
  const columns: DataTableColumn<Candidate>[] = [
    { key: 'name', header: 'Candidate', render: (c) => <span className="font-medium">{c.firstName} {c.lastName}</span> },
    { key: 'email', header: 'Email' },
    { key: 'source', header: 'Source' },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Preview')}>Preview</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Download')}>Download</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Replace')}>Replace</Button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Resume Management' }]} title="Resume Management" description="Preview, download, version history, and keyword search" />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        <input type="search" placeholder="Keyword search across resumes..." className="mb-4 w-full max-w-md rounded-lg border border-border px-3 py-2 text-sm" />
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={candidates as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}
