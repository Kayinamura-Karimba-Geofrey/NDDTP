import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateCourseMutation } from '../api/training.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(1, 'Course title is required'),
  category: z.string().min(1, 'Category is required'),
  instructor: z.string().min(1, 'Instructor is required'),
  deliveryMode: z.string().min(1, 'Delivery mode is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  duration: z.string().min(1, 'Duration is required'),
});
type FormData = z.infer<typeof schema>;

interface Props { isOpen: boolean; onClose: () => void; }

export function CreateCourseModal({ isOpen, onClose }: Props) {
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCourse({ ...data, capacity: Number(data.capacity) }).unwrap();
      toast.success('Course created successfully');
      onClose();
    } catch {
      toast.error('Failed to create course');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Training Course">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Course Title" {...register('title')} error={errors.title?.message} placeholder="e.g. Cyber Security Fundamentals" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              <option value="Technical">Technical</option>
              <option value="Leadership">Leadership</option>
              <option value="Compliance">Compliance</option>
              <option value="Health & Safety">Health &amp; Safety</option>
              <option value="Professional Development">Professional Development</option>
            </select>
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Delivery Mode</label>
            <select {...register('deliveryMode')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              <option value="Classroom">Classroom</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Workshop">Workshop</option>
            </select>
            {errors.deliveryMode && <p className="text-sm text-destructive">{errors.deliveryMode.message}</p>}
          </div>
        </div>
        <Input label="Instructor" {...register('instructor')} error={errors.instructor?.message} placeholder="Instructor name" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Duration" {...register('duration')} error={errors.duration?.message} placeholder="e.g. 5 days" />
          <Input label="Max Participants" type="number" {...register('capacity')} error={errors.capacity?.message} placeholder="e.g. 30" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Create Course</Button>
        </div>
      </form>
    </Modal>
  );
}
