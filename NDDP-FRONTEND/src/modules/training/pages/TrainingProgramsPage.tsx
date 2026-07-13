import { FiPlus } from 'react-icons/fi';
import { useGetTrainingProgramsQuery, useCreateProgramMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';

export function TrainingProgramsPage() {
  const { data: programs = [], isLoading } = useGetTrainingProgramsQuery();
  const [createProgram, { isLoading: isCreating }] = useCreateProgramMutation();

  const handleCreate = async () => {
    try {
      await createProgram({ name: 'New Program', status: 'DRAFT' }).unwrap();
      toast.success('Program created — edit details to complete setup');
    } catch {
      toast.error('Failed to create program');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Programs' }]} title="Training Programs" description="Structured programs grouping multiple courses" actions={<Button onClick={handleCreate} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Create Program</Button>} />
      <TrainingSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Card key={p.id}>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4 text-sm">
                <p className="text-muted-foreground">{p.objectives}</p>
                <p><strong>Duration:</strong> {p.duration}</p>
                <p><strong>Required Courses:</strong> {p.requiredCourses}</p>
                <p><strong>Participants:</strong> {p.participants ?? '—'}</p>
                <p><strong>Certification:</strong> {p.certification}</p>
                <TrainingStatusBadge status={p.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
