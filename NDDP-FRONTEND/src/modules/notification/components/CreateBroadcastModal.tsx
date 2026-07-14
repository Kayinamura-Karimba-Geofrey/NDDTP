import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useSendBroadcastMutation } from '../api/notification.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Broadcast subject title is required'),
  audience: z.string().min(2, 'Target audience scope is required'),
  channelsRaw: z.string().min(2, 'Delivery channels (comma separated) is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBroadcastModal({ isOpen, onClose }: Props) {
  const [sendBroadcast, { isLoading }] = useSendBroadcastMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await sendBroadcast({
        ...data,
        channels: data.channelsRaw,
        sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        recipients: 100,
        status: 'SENT',
      }).unwrap();
      toast.success('Broadcast transmission initialized');
      onClose();
    } catch {
      toast.error('Failed to trigger broadcast');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initialize Bulk Broadcast">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Broadcast Subject Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Quarterly Town Hall Reminder" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Target Audience Scope *" {...register('audience')} error={errors.audience?.message} placeholder="e.g. Entire Organization / HR Staff" />
          <Input label="Delivery Channels (comma-separated) *" {...register('channelsRaw')} error={errors.channelsRaw?.message} placeholder="e.g. Email, SMS, In-App" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Transmit Broadcast</Button>
        </div>
      </form>
    </Modal>
  );
}
