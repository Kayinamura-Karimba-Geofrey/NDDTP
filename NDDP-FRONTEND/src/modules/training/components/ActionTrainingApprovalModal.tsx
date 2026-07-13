import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Button } from '@/components/ui';
import { useActionTrainingApprovalMutation } from '../api/training.api';
import type { TrainingApproval } from '../constants/training-data';
import toast from 'react-hot-toast';

const schema = z.object({
  comments: z.string().min(1, 'Comments are required for this action'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  approval: TrainingApproval | null;
  action: 'APPROVED' | 'REJECTED' | 'RETURNED' | null;
  onClose: () => void;
}

export function ActionTrainingApprovalModal({ isOpen, approval, action, onClose }: Props) {
  const [actionApproval, { isLoading }] = useActionTrainingApprovalMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    if (!approval || !action) return;
    try {
      await actionApproval({ id: approval.id, action, comments: data.comments }).unwrap();
      toast.success(`Request ${action.toLowerCase()} successfully`);
      onClose();
    } catch {
      toast.error('Failed to process approval');
    }
  };

  const labels = { APPROVED: 'Approve Request', REJECTED: 'Reject Request', RETURNED: 'Return for Revision' };
  const variants: Record<string, any> = { APPROVED: 'default', REJECTED: 'destructive', RETURNED: 'secondary' };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={action ? labels[action] : 'Action Request'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {approval && (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p><strong>Employee:</strong> {approval.employeeName}</p>
            <p><strong>Course:</strong> {approval.course}</p>
            <p><strong>Priority:</strong> {approval.priority}</p>
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium">Comments / Justification *</label>
          <textarea
            {...register('comments')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px] ${errors.comments ? 'border-destructive' : 'border-input'}`}
            placeholder="Required reasoning for this decision..."
          />
          {errors.comments && <p className="text-sm text-destructive">{errors.comments.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant={action ? variants[action] : 'default'} isLoading={isLoading}>Confirm</Button>
        </div>
      </form>
    </Modal>
  );
}
