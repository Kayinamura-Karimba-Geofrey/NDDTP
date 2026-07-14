import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAutomationRuleMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Automation trigger name is required'),
  trigger: z.string().min(3, 'Trigger event condition is required'),
  action: z.string().min(3, 'Action script/reference is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAutomationRuleModal({ isOpen, onClose }: Props) {
  const [createAuto, { isLoading }] = useCreateAutomationRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createAuto({
        ...data,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Automation rule established');
      onClose();
    } catch {
      toast.error('Failed to create automation rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Automation Trigger">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Rule Title *" {...register('name')} error={errors.name?.message} placeholder="e.g. Notify Supervisor" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Event Trigger Condition *" {...register('trigger')} error={errors.trigger?.message} placeholder="e.g. Task assigned" />
          <Input label="Action to Invoke *" {...register('action')} error={errors.action?.message} placeholder="e.g. Send in-app + email notification" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Rule</Button>
        </div>
      </form>
    </Modal>
  );
}
