import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { MOCK_PROGRAMS } from '../constants/training-data';

export function TrainingProgramsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Programs' }]} title="Training Programs" description="Structured programs grouping multiple courses" actions={<Button onClick={() => toast('Create program')}><FiPlus className="h-4 w-4" /> Create Program</Button>} />
      <TrainingSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PROGRAMS.map((p) => (
          <Card key={p.id}>
            <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{p.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm">
              <p className="text-muted-foreground">{p.objectives}</p>
              <p><strong>Duration:</strong> {p.duration}</p>
              <p><strong>Required:</strong> {p.requiredCourses} courses · <strong>Electives:</strong> {p.electives}</p>
              <p><strong>Competencies:</strong> {p.competencies}</p>
              <p><strong>Certification:</strong> {p.certification}</p>
              <p><strong>Participants:</strong> {p.participants}</p>
              <TrainingStatusBadge status={p.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
