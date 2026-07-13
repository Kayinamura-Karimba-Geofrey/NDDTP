import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetClassroomsQuery, useAddClassroomMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import toast from 'react-hot-toast';

export function ClassroomsPage() {
  const { data: classrooms = [], isLoading } = useGetClassroomsQuery();
  const [addClassroom, { isLoading: isAdding }] = useAddClassroomMutation();

  const handleAdd = async () => {
    try {
      await addClassroom({ name: 'New Room' }).unwrap();
      toast.success('Classroom added');
    } catch {
      toast.error('Failed to add classroom');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Classrooms' }]} title="Classrooms" description="Physical and virtual training rooms" actions={<Button onClick={handleAdd} isLoading={isAdding}><FiPlus className="h-4 w-4" /> Add Classroom</Button>} />
      <TrainingSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classrooms.map((room) => (
            <Card key={room.id}>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  {room.name}
                  {room.isVirtual && <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-500">Virtual</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 pt-4 text-sm">
                <p><strong>Capacity:</strong> {room.capacity}</p>
                <p><strong>Building:</strong> {room.building}</p>
                <p><strong>Equipment:</strong> {room.equipment}</p>
                <p><strong>Availability:</strong> {room.availability}</p>
                {room.meetingLink && <p className="truncate text-xs text-muted-foreground">{room.meetingLink}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
