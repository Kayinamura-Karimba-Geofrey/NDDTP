import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSearchDocumentMutation, useGetSearchIndexesQuery } from '../api/search.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Document title is required'),
  indexId: z.string().min(1, 'Please select an index'),
  externalId: z.string().min(2, 'External reference ID is required'),
  content: z.string().min(5, 'Document content is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSearchDocumentModal({ isOpen, onClose }: Props) {
  const [createDoc, { isLoading }] = useCreateSearchDocumentMutation();
  const { data: indexes = [] } = useGetSearchIndexesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedIdx = indexes.find((i) => i.id === data.indexId);
      await createDoc({
        ...data,
        indexName: selectedIdx?.name ?? '—',
        status: 'ACTIVE',
        indexedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      }).unwrap();
      toast.success('Document index entry queued');
      onClose();
    } catch {
      toast.error('Failed to register index entry');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Index Document Entry">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Document Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Q3 Strategic Plan" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Target Index *</label>
            <select {...register('indexId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select Index...</option>
              {indexes.map((idx) => (
                <option key={idx.id} value={idx.id}>{idx.name}</option>
              ))}
            </select>
            {errors.indexId && <p className="text-sm text-destructive">{errors.indexId.message}</p>}
          </div>
          <Input label="External Reference ID *" {...register('externalId')} error={errors.externalId?.message} placeholder="e.g. DOC-99421" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Document Content *</label>
          <textarea {...register('content')} rows={3} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Paste document contents here..." />
          {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Document</Button>
        </div>
      </form>
    </Modal>
  );
}
