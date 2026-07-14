import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateChannelMutation } from '../api/messaging.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Channel name is required'),
  type: z.enum(['DIRECT', 'GROUP', 'DEPARTMENT', 'BROADCAST']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateChannelModal({ isOpen, onClose }: Props) {
  const [createChannel, { isLoading }] = useCreateChannelMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createChannel({
        ...data,
        members: 1,
        unread: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Communication channel created');
      onClose();
    } catch {
      toast.error('Failed to create channel');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Communication Channel">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Channel / Group Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. #ops-hq" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Channel Type *</label>
          <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="GROUP">Team Discussion Group</option>
            <option value="DEPARTMENT">Department Channel</option>
            <option value="BROADCAST">Announcements Broadcast</option>
            <option value="DIRECT">Private Direct Thread</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Channel</Button>
        </div>
      </form>
    </Modal>
  );
}
