import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useUpdateLeaveRequestStatusMutation } from '../api/leave.api';
import toast from 'react-hot-toast';
import type { LeaveRequest } from '../constants/leave-data';

const actionSchema = z.object({
  comments: z.string().min(2, 'Comments are required for this action'),
});

type ActionFormValues = z.infer<typeof actionSchema>;

interface ActionLeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: LeaveRequest | null;
  action: 'APPROVED' | 'REJECTED' | 'MORE_INFO' | null;
}

export function ActionLeaveRequestModal({ isOpen, onClose, request, action }: ActionLeaveRequestModalProps) {
  const [updateStatus, { isLoading }] = useUpdateLeaveRequestStatusMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ActionFormValues>({
    resolver: zodResolver(actionSchema),
    defaultValues: { comments: '' },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: ActionFormValues) => {
    if (!request || !action) return;
    try {
      await updateStatus({ id: request.id, status: action, comments: data.comments }).unwrap();
      toast.success(`Leave request ${action.toLowerCase()}`);
      onClose();
      reset();
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} request`);
    }
  };

  const actionLabels: Record<string, string> = {
    APPROVED: 'Approve',
    REJECTED: 'Reject',
    MORE_INFO: 'Request Info',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${actionLabels[action || 'APPROVED']} Leave Request`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {request && (
          <div className="rounded bg-muted p-3 text-sm">
            <p><strong>Employee:</strong> {request.employeeName}</p>
            <p><strong>Type:</strong> {request.leaveTypeName}</p>
            <p><strong>Days:</strong> {request.totalDays}</p>
          </div>
        )}
        <div>
          <Input label="Comments / Reason" {...register('comments')} error={errors.comments?.message} autoFocus />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Confirm'}</Button>
        </div>
      </form>
    </Modal>
  );
}
