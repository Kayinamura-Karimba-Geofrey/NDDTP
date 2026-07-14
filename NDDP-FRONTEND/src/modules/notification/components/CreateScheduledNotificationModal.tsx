import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useScheduleNotificationMutation } from '../api/notification.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Message title is required'),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'IN_APP']),
  scheduledFor: z.string().min(1, 'Scheduled date & time is required'),
  audience: z.string().min(2, 'Target audience is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateScheduledNotificationModal({ isOpen, onClose }: Props) {
  const [scheduleNotification, { isLoading }] = useScheduleNotificationMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await scheduleNotification({
        ...data,
        status: 'SCHEDULED',
      }).unwrap();
      toast.success('Communication scheduled successfully');
      onClose();
    } catch {
      toast.error('Failed to schedule communication');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Scheduled Alert Run">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Scheduled Message Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Birthday Greeting — Col. Nsengimana" />
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Channel *</label>
            <select {...register('channel')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="EMAIL">Email Dispatch</option>
              <option value="SMS">SMS Message</option>
              <option value="PUSH">Push Notification</option>
              <option value="IN_APP">In-App Notification</option>
            </select>
          </div>
          <Input label="Scheduled Time *" type="datetime-local" {...register('scheduledFor')} error={errors.scheduledFor?.message} />
          <Input label="Audience Scope *" {...register('audience')} error={errors.audience?.message} placeholder="e.g. Fleet Unit / Individual" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Schedule</Button>
        </div>
      </form>
    </Modal>
  );
}
