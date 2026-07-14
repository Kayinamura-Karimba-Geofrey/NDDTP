import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Button } from '@/components/ui';
import { useUpdatePresenceMutation } from '../api/messaging.api';
import toast from 'react-hot-toast';

const schema = z.object({
  status: z.enum(['ONLINE', 'AWAY', 'OFFLINE', 'MUTED']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SetPresenceModal({ isOpen, onClose }: Props) {
  const [updatePresence, { isLoading }] = useUpdatePresenceMutation();
  const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updatePresence({
        status: data.status,
      }).unwrap();
      toast.success('Your chat presence status has been updated');
      onClose();
    } catch {
      toast.error('Failed to change status');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Chat Status">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Presence Status *</label>
          <select {...register('status')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="ONLINE">Online (Available)</option>
            <option value="AWAY">Away (Inactive)</option>
            <option value="MUTED">Do Not Disturb</option>
            <option value="OFFLINE">Offline (Invisible)</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Status</Button>
        </div>
      </form>
    </Modal>
  );
}
