import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateReminderRuleMutation } from '../api/notification.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Rule name is required'),
  trigger: z.string().min(3, 'Trigger event condition is required'),
  channel: z.string().min(2, 'Delivery channels are required'),
  leadTime: z.string().min(1, 'Lead timeframe trigger is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateReminderRuleModal({ isOpen, onClose }: Props) {
  const [createRule, { isLoading }] = useCreateReminderRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createRule({
        ...data,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Reminder engine rule established');
      onClose();
    } catch {
      toast.error('Failed to save reminder rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Reminder Logic">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Rule Title Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Contract Expiry Reminder" />
        <div className="grid grid-cols-3 gap-4">
          <Input label="Event Trigger *" {...register('trigger')} error={errors.trigger?.message} placeholder="e.g. Contract ends in 30 days" />
          <Input label="Channels *" {...register('channel')} error={errors.channel?.message} placeholder="e.g. Email / Push" />
          <Input label="Lead Time Frame *" {...register('leadTime')} error={errors.leadTime?.message} placeholder="e.g. 30 days / 48 hours" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Rule</Button>
        </div>
      </form>
    </Modal>
  );
}
