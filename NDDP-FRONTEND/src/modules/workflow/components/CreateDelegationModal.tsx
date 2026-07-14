import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateDelegationMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  delegate: z.string().min(2, 'Delegate name is required'),
  actingFor: z.string().min(2, 'Owner name to act for is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(3, 'Reason is required'),
  scope: z.string().min(2, 'Delegation scope is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDelegationModal({ isOpen, onClose }: Props) {
  const [createDelegation, { isLoading }] = useCreateDelegationMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createDelegation({
        ...data,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Authority delegation recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to save delegation');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delegate Approval Authority">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Delegate Personnel *" {...register('delegate')} error={errors.delegate?.message} placeholder="e.g. Patrick Habimana" />
          <Input label="Acting For (Owner) *" {...register('actingFor')} error={errors.actingFor?.message} placeholder="e.g. Jean Mukamana" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date *" type="date" {...register('startDate')} error={errors.startDate?.message} />
          <Input label="End Date *" type="date" {...register('endDate')} error={errors.endDate?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Reason for Delegation *" {...register('reason')} error={errors.reason?.message} placeholder="e.g. Annual leave / Duty travel" />
          <Input label="Scope of Authority *" {...register('scope')} error={errors.scope?.message} placeholder="e.g. Leave approvals / Expense approvals" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Delegation</Button>
        </div>
      </form>
    </Modal>
  );
}
