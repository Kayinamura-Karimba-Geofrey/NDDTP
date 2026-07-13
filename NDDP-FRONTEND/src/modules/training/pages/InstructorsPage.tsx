import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetInstructorsQuery, useAddInstructorMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import toast from 'react-hot-toast';

export function InstructorsPage() {
  const { data: instructors = [], isLoading } = useGetInstructorsQuery();
  const [addInstructor, { isLoading: isAdding }] = useAddInstructorMutation();

  const handleAdd = async () => {
    try {
      await addInstructor({ name: 'New Instructor' }).unwrap();
      toast.success('Instructor added');
    } catch {
      toast.error('Failed to add instructor');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Instructors' }]} title="Instructors" description="Manage trainers and instructors" actions={<Button onClick={handleAdd} isLoading={isAdding}><FiPlus className="h-4 w-4" /> Add Instructor</Button>} />
      <TrainingSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((inst) => (
            <Card key={inst.id}>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm">{inst.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 pt-4 text-sm">
                <p><strong>Department:</strong> {inst.department}</p>
                <p><strong>Specialization:</strong> {inst.specialization}</p>
                <p><strong>Courses Taught:</strong> {inst.courses}</p>
                <p><strong>Certifications:</strong> {inst.certifications}</p>
                <p><strong>Availability:</strong> {inst.availability}</p>
                <p><strong>Rating:</strong> ⭐ {inst.rating}/5.0</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
