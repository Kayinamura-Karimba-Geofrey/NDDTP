import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Button } from '@/components/ui';
import { useActionPerformanceApprovalMutation } from '../api/performance.api';
import type { PerformanceApproval } from '../constants/performance-data';
import toast from 'react-hot-toast';

const schema = z.object({
  comments: z.string().min(1, 'Comments are required'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  approval: PerformanceApproval | null;
  action: 'APPROVED' | 'REJECTED' | null;
  onClose: () => void;
}

export function ActionPerformanceApprovalModal({ isOpen, approval, action, onClose }: Props) {
  const [actionApproval, { isLoading }] = useActionPerformanceApprovalMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    if (!approval || !action) return;
    try {
      await actionApproval({ id: approval.id, action, comments: data.comments }).unwrap();
      toast.success(`${approval.type} ${action.toLowerCase()} successfully`);
      onClose();
    } catch {
      toast.error('Failed to process approval');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={action === 'APPROVED' ? 'Approve Request' : 'Reject Request'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {approval && (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p><strong>Type:</strong> {approval.type}</p>
            <p><strong>Reference:</strong> {approval.reference}</p>
            <p><strong>Requester:</strong> {approval.requester}</p>
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium">Comments *</label>
          <textarea
            {...register('comments')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[100px] ${errors.comments ? 'border-destructive' : 'border-input'}`}
            placeholder="Required reasoning..."
          />
          {errors.comments && <p className="text-sm text-destructive">{errors.comments.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant={action === 'REJECTED' ? 'danger' : 'primary'} isLoading={isLoading}>Confirm</Button>
        </div>
      </form>
    </Modal>
  );
}
