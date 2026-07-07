import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_COMPETENCIES } from '../constants/training-data';

export function CompetenciesPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Competencies' }]} title="Competencies" description="Professional competency tracking and skill gap analysis" />
      <TrainingSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_COMPETENCIES.map((c) => (
          <Card key={c.id}>
            <CardContent className="pt-6">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.category}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Current: <strong>{c.level}</strong></span>
                <span>Target: <strong>{c.targetLevel}</strong></span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{c.personnelCount} personnel assessed</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm font-medium">Competency Matrix (Summary)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="p-2 text-left">Competency</th><th className="p-2">Beginner</th><th className="p-2">Intermediate</th><th className="p-2">Advanced</th><th className="p-2">Expert</th></tr></thead>
              <tbody>
                {MOCK_COMPETENCIES.map((c) => (
                  <tr key={c.id} className="border-b border-border">
                    <td className="p-2 font-medium">{c.name}</td>
                    <td className="p-2 text-center">{c.level === 'Beginner' ? '●' : ''}</td>
                    <td className="p-2 text-center">{c.level === 'Intermediate' ? '●' : ''}</td>
                    <td className="p-2 text-center">{c.level === 'Advanced' ? '●' : ''}</td>
                    <td className="p-2 text-center">{c.level === 'Expert' ? '●' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
