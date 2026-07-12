import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAdjustLeaveBalanceMutation } from '../api/leave.api';
import toast from 'react-hot-toast';

const adjustSchema = z.object({
  daysToAdjust: z.number(),
  reason: z.string().min(5, 'A reason is required'),
});

type AdjustFormValues = z.infer<typeof adjustSchema>;

interface AdjustBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  leaveTypeName: string;
}

export function AdjustBalanceModal({ isOpen, onClose, employeeName, leaveTypeName }: AdjustBalanceModalProps) {
  const [adjustBalance, { isLoading }] = useAdjustLeaveBalanceMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdjustFormValues>({
    resolver: zodResolver(adjustSchema),
    defaultValues: { daysToAdjust: 0, reason: '' },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: AdjustFormValues) => {
    try {
      await adjustBalance(data).unwrap();
      toast.success('Leave balance adjusted successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to adjust balance');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Leave Balance">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded bg-muted p-3 text-sm mb-4">
          <p><strong>Employee:</strong> {employeeName}</p>
          <p><strong>Leave Type:</strong> {leaveTypeName}</p>
        </div>
        <div>
          <Input label="Days to Adjust (use negative for deduction)" type="number" {...register('daysToAdjust', { valueAsNumber: true })} error={errors.daysToAdjust?.message} />
        </div>
        <div>
          <Input label="Reason for adjustment" {...register('reason')} error={errors.reason?.message} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Apply Adjustment'}</Button>
        </div>
      </form>
    </Modal>
  );
}
