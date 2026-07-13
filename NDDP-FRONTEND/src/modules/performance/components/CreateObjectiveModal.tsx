import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateGoalMutation } from '../api/performance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  weight: z.string().optional(),
  target: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props { isOpen: boolean; onClose: () => void; }

export function CreateObjectiveModal({ isOpen, onClose }: Props) {
  const [createGoal, { isLoading }] = useCreateGoalMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createGoal({ ...data, level: 'individual', weight: data.weight ? Number(data.weight) : undefined }).unwrap();
      toast.success('Objective created successfully');
      onClose();
    } catch {
      toast.error('Failed to create objective');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Individual Objective">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Objective Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Complete CISSP certification" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            {...register('description')}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]"
            placeholder="What does success look like?"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Due Date *" type="date" {...register('dueDate')} error={errors.dueDate?.message} />
          <Input label="Weight (%)" type="number" {...register('weight')} placeholder="e.g. 25" />
        </div>
        <Input label="Target / Measurement" {...register('target')} placeholder="e.g. Pass exam with 80%+" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Create Objective</Button>
        </div>
      </form>
    </Modal>
  );
}
