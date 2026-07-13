import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Button } from '@/components/ui';
import { useGiveFeedbackMutation } from '../api/performance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  to: z.string().min(1, 'Recipient is required'),
  type: z.string().min(1, 'Type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type FormData = z.infer<typeof schema>;

interface Props { isOpen: boolean; onClose: () => void; }

export function GiveFeedbackModal({ isOpen, onClose }: Props) {
  const [giveFeedback, { isLoading }] = useGiveFeedbackMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await giveFeedback(data).unwrap();
      toast.success('Feedback submitted successfully');
      onClose();
    } catch {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Give Feedback">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Recipient *</label>
          <input
            {...register('to')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ${errors.to ? 'border-destructive' : 'border-input'}`}
            placeholder="Enter name..."
          />
          {errors.to && <p className="text-sm text-destructive">{errors.to.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Feedback Type *</label>
          <select {...register('type')} className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ${errors.type ? 'border-destructive' : 'border-input'}`}>
            <option value="">Select type...</option>
            <option value="Positive">Positive</option>
            <option value="Constructive">Constructive</option>
            <option value="Recognition">Recognition</option>
            <option value="360 Feedback">360° Feedback</option>
          </select>
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Message *</label>
          <textarea
            {...register('message')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[120px] ${errors.message ? 'border-destructive' : 'border-input'}`}
            placeholder="Write your feedback here..."
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Feedback</Button>
        </div>
      </form>
    </Modal>
  );
}
