import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAddMemberToChannelMutation } from '../api/messaging.api';
import toast from 'react-hot-toast';

const schema = z.object({
  userId: z.string().min(2, 'Username or User ID is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  channelId?: string;
}

export function AddMemberModal({ isOpen, onClose, channelId = 'CH-002' }: Props) {
  const [addMember, { isLoading }] = useAddMemberToChannelMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await addMember({
        channelId,
        userId: data.userId,
      }).unwrap();
      toast.success('Member joined channel successfully');
      onClose();
    } catch {
      toast.error('Failed to add member to channel');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Member to Group">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Staff Member ID / Code *" {...register('userId')} error={errors.userId?.message} placeholder="e.g. EMP-441 / alice.uwimana" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Member</Button>
        </div>
      </form>
    </Modal>
  );
}
