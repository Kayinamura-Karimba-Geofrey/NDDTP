import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_LEARNING_PATHS } from '../constants/training-data';

export function LearningPathsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Learning Paths' }]} title="Learning Paths" description="Structured career development pathways" actions={<Button onClick={() => toast('Create learning path')}><FiPlus className="h-4 w-4" /> Create Path</Button>} />
      <TrainingSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_LEARNING_PATHS.map((lp) => (
          <Card key={lp.id}>
            <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{lp.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm">
              <p><strong>Role:</strong> {lp.role}</p>
              <p><strong>Courses:</strong> {lp.courses} · <strong>Duration:</strong> {lp.duration}</p>
              <p><strong>Enrolled:</strong> {lp.enrolled} personnel</p>
              <TrainingStatusBadge status={lp.status} />
              <Button variant="outline" size="sm" className="mt-2" onClick={() => toast(`Enrolled in ${lp.name}`)}>Enroll in Path</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
