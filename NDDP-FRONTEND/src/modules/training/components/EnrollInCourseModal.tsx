import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useEnrollInCourseMutation } from '../api/training.api';
import type { TrainingCourse } from '../constants/training-data';
import toast from 'react-hot-toast';

const schema = z.object({
  reason: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  course: TrainingCourse | null;
  onClose: () => void;
}

export function EnrollInCourseModal({ isOpen, course, onClose }: Props) {
  const [enroll, { isLoading }] = useEnrollInCourseMutation();
  const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    if (!course) return;
    try {
      await enroll({ courseId: course.id, reason: data.reason }).unwrap();
      toast.success(`Enrolled in "${course.title}" successfully`);
      onClose();
    } catch {
      toast.error('Failed to enroll in course');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll in Course">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {course && (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p><strong>Course:</strong> {course.title}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Mode:</strong> {course.deliveryMode}</p>
            <p><strong>Available Slots:</strong> {course.capacity - (course.enrolled ?? 0)}</p>
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason / Motivation (Optional)</label>
          <textarea
            {...register('reason')}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]"
            placeholder="Why do you want to take this course?"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Confirm Enrollment</Button>
        </div>
      </form>
    </Modal>
  );
}
