import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { type Assessment } from '../constants/recruitment-data';
import { useGetAssessmentsQuery } from '../api/recruitment.api';

export function AssessmentsPage() {
  const { data: assessments = [], isLoading } = useGetAssessmentsQuery();
  const columns: DataTableColumn<Assessment>[] = [
    { key: 'name', header: 'Candidate', render: (a) => <span className="font-medium">{a.candidateName}</span> },
    { key: 'type', header: 'Assessment Type' },
    { key: 'score', header: 'Score', render: (a) => `${a.score}/${a.passMark}` },
    { key: 'evaluator', header: 'Evaluator' },
    { key: 'result', header: 'Result', render: (a) => <span className={a.passed ? 'text-success font-medium' : 'text-destructive font-medium'}>{a.passed ? 'Pass' : 'Fail'}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Assessments' }]} title="Assessments" description="Written tests, technical assessments, practical exercises, and language assessments" />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={assessments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}
