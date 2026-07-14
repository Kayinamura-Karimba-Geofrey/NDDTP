import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSlaRuleMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  workflowType: z.string().min(2, 'Workflow type is required'),
  targetHours: z.string().min(1, 'Target completion hours is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSlaRuleModal({ isOpen, onClose }: Props) {
  const [createSla, { isLoading }] = useCreateSlaRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createSla({
        ...data,
        targetHours: Number(data.targetHours),
        compliance: 100,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('SLA target configuration saved');
      onClose();
    } catch {
      toast.error('Failed to save SLA rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add SLA Target">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Workflow / Process Type *" {...register('workflowType')} error={errors.workflowType?.message} placeholder="e.g. Leave Approval" />
        <Input label="Target Resolution Time (Hours) *" type="number" {...register('targetHours')} error={errors.targetHours?.message} placeholder="e.g. 48" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save SLA</Button>
        </div>
      </form>
    </Modal>
  );
}
