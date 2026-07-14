import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useBlacklistVisitorMutation } from '../api/visitor.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  reason: z.string().min(5, 'Reason for blacklist details are required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BlacklistVisitorModal({ isOpen, onClose }: Props) {
  const [blacklistVisitor, { isLoading }] = useBlacklistVisitorMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await blacklistVisitor({
        ...data,
        addedBy: 'Security Officer',
        addedAt: new Date().toISOString().split('T')[0],
        status: 'BLACKLISTED',
      }).unwrap();
      toast.success('Subject added to physical blacklist');
      onClose();
    } catch {
      toast.error('Failed to blacklist subject');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Blacklist Subject Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Subject Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Blocked Subject" />
        <Input label="Reason for Restrictions *" {...register('reason')} error={errors.reason?.message} placeholder="e.g. Unauthorized access attempt" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="danger" isLoading={isLoading}>Blacklist Subject</Button>
        </div>
      </form>
    </Modal>
  );
}
