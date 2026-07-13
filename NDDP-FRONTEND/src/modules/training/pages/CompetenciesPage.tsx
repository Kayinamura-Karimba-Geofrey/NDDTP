import { useGetCompetenciesQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

export function CompetenciesPage() {
  const { data: competencies = [], isLoading } = useGetCompetenciesQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Competencies' }]} title="Competencies" description="Organisational competency framework and skill gap analysis" />
      <TrainingSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => {
            const pct = Math.min(100, Math.round((c.personnelCount / 500) * 100));
            return (
              <Card key={c.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.category}</p>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{c.level}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Personnel: {c.personnelCount}</span>
                      <span>Target: {c.targetLevel}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
