import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useSubmitTrainingRequestMutation } from '../api/training.api';
import toast from 'react-hot-toast';

const schema = z.object({
  requestedCourse: z.string().min(1, 'Course is required'),
  reason: z.string().min(1, 'Reason is required'),
  priority: z.string().min(1, 'Priority is required'),
});
type FormData = z.infer<typeof schema>;

interface Props { isOpen: boolean; onClose: () => void; }

export function SubmitTrainingRequestModal({ isOpen, onClose }: Props) {
  const [submit, { isLoading }] = useSubmitTrainingRequestMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await submit(data).unwrap();
      toast.success('Training request submitted');
      onClose();
    } catch {
      toast.error('Failed to submit request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Training Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Requested Course" {...register('requestedCourse')} error={errors.requestedCourse?.message} placeholder="Course name" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Priority</label>
          <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select priority...</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && <p className="text-sm text-destructive">{errors.priority.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Request</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[100px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Why is this training needed?"
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
}
