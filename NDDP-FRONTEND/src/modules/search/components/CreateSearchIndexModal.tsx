import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSearchIndexMutation } from '../api/search.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(2, 'Index code is required'),
  indexType: z.enum(['SYSTEM', 'USER', 'CUSTOM']),
  description: z.string().min(5, 'Description is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSearchIndexModal({ isOpen, onClose }: Props) {
  const [createIndex, { isLoading }] = useCreateSearchIndexMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createIndex({
        ...data,
        documentCount: 0,
        status: 'ACTIVE',
        lastIndexedAt: '—',
      }).unwrap();
      toast.success('Search index configured successfully');
      onClose();
    } catch {
      toast.error('Failed to configure search index');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Search Index">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Index Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Personnel Registry Index" />
          <Input label="Index Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. idx_personnel" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Index Type *</label>
          <select {...register('indexType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="CUSTOM">Custom Data Index</option>
            <option value="USER">User Directory Index</option>
            <option value="SYSTEM">System Logs Index</option>
          </select>
        </div>
        <Input label="Description *" {...register('description')} error={errors.description?.message} placeholder="e.g. Indexes all active and inactive personnel profiles" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Index</Button>
        </div>
      </form>
    </Modal>
  );
}
