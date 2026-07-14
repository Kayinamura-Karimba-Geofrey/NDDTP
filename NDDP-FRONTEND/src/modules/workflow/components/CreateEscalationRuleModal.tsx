import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateEscalationRuleMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Escalation rule name is required'),
  triggerHours: z.string().min(1, 'Trigger timeframe is required'),
  action: z.string().min(2, 'Action is required'),
  target: z.string().min(2, 'Target recipient role is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEscalationRuleModal({ isOpen, onClose }: Props) {
  const [createEsc, { isLoading }] = useCreateEscalationRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createEsc({
        ...data,
        triggerHours: Number(data.triggerHours),
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Escalation rule saved successfully');
      onClose();
    } catch {
      toast.error('Failed to create escalation rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Escalation Rule">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Rule Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Supervisor Escalation" />
        <div className="grid grid-cols-3 gap-4">
          <Input label="Trigger Timeframe (Hours) *" type="number" {...register('triggerHours')} error={errors.triggerHours?.message} placeholder="e.g. 72" />
          <Input label="Action to Trigger *" {...register('action')} error={errors.action?.message} placeholder="e.g. Reassignment / Reminder" />
          <Input label="Escalation Target Role *" {...register('target')} error={errors.target?.message} placeholder="e.g. Supervisor / Director" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Rule</Button>
        </div>
      </form>
    </Modal>
  );
}
