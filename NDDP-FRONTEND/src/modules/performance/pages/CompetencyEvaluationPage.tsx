import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_COMPETENCIES, type CompetencyRating } from '../constants/performance-data';

const LEVELS = ['Beginner', 'Developing', 'Proficient', 'Advanced', 'Expert'];

export function CompetencyEvaluationPage() {
  const columns: DataTableColumn<CompetencyRating>[] = [
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'category', header: 'Competency' },
    { key: 'level', header: 'Level' },
    { key: 'rating', header: 'Rating', render: (r) => `${r.rating}/5` },
    { key: 'comments', header: 'Comments', render: (r) => r.comments ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Competencies' }]} title="Competency Evaluation" description="Behavioral and technical competency assessment" />
      <PerformanceSubNav />
      <p className="mb-4 text-sm text-muted-foreground">Levels: {LEVELS.join(' → ')}</p>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_COMPETENCIES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
