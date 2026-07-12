import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateDelegationMutation } from '../api/leave.api';
import toast from 'react-hot-toast';

const delegationSchema = z.object({
  delegateTo: z.string().min(2, 'Delegate is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().optional(),
});

type DelegationFormValues = z.infer<typeof delegationSchema>;

interface CreateDelegationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDelegationModal({ isOpen, onClose }: CreateDelegationModalProps) {
  const [createDelegation, { isLoading }] = useCreateDelegationMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DelegationFormValues>({
    resolver: zodResolver(delegationSchema),
    defaultValues: { delegateTo: '', startDate: '', endDate: '', reason: '' },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: DelegationFormValues) => {
    try {
      await createDelegation(data).unwrap();
      toast.success('Authority delegated successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to delegate authority');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Delegation">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input label="Delegate To (Employee ID or Name)" {...register('delegateTo')} error={errors.delegateTo?.message} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Start Date" type="date" {...register('startDate')} error={errors.startDate?.message} />
          <Input label="End Date" type="date" {...register('endDate')} error={errors.endDate?.message} />
        </div>
        <div>
          <Input label="Reason (Optional)" {...register('reason')} error={errors.reason?.message} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Delegate Authority'}</Button>
        </div>
      </form>
    </Modal>
  );
}
