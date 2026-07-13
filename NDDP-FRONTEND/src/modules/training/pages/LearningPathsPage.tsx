import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetLearningPathsQuery, useEnrollInLearningPathMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import toast from 'react-hot-toast';

export function LearningPathsPage() {
  const { data: paths = [], isLoading } = useGetLearningPathsQuery();
  const [enrollInPath] = useEnrollInLearningPathMutation();

  const handleEnroll = async (id: string, name: string) => {
    try {
      await enrollInPath({ id }).unwrap();
      toast.success(`Enrolled in "${name}" successfully`);
    } catch {
      toast.error('Failed to enroll in learning path');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Learning Paths' }]} title="Learning Paths" description="Structured career development pathways" actions={<Button onClick={() => toast('Create learning path form coming soon')}><FiPlus className="h-4 w-4" /> Create Path</Button>} />
      <TrainingSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((lp) => (
            <Card key={lp.id}>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm">{lp.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4 text-sm">
                <p><strong>Target Role:</strong> {lp.role}</p>
                <p><strong>Courses:</strong> {lp.courses}</p>
                <p><strong>Duration:</strong> {lp.duration}</p>
                <p><strong>Enrolled:</strong> {lp.enrolled}</p>
                <TrainingStatusBadge status={lp.status} />
                <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => handleEnroll(lp.id, lp.name)}>
                  Enroll in Path
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
