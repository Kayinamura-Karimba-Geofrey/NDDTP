import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { usePublishAnnouncementMutation } from '../api/notification.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Announcement title is required'),
  category: z.string().min(2, 'Category notice domain is required'),
  audience: z.string().min(2, 'Audience scope is required'),
  publishDate: z.string().min(1, 'Publish start date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAnnouncementModal({ isOpen, onClose }: Props) {
  const [publishAnn, { isLoading }] = usePublishAnnouncementMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await publishAnn({
        ...data,
        priority: 'Normal',
        status: 'PUBLISHED',
      }).unwrap();
      toast.success('Announcement published successfully');
      onClose();
    } catch {
      toast.error('Failed to publish announcement');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish System Announcement">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Announcement Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. System Maintenance Window" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Category Notice Type *" {...register('category')} error={errors.category?.message} placeholder="e.g. Holiday Notice / Policy Update" />
          <Input label="Audience Scope *" {...register('audience')} error={errors.audience?.message} placeholder="e.g. All Staff / IT Users" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Publish Start Date *" type="date" {...register('publishDate')} error={errors.publishDate?.message} />
          <Input label="Expiry Date *" type="date" {...register('expiryDate')} error={errors.expiryDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Publish Bulletin</Button>
        </div>
      </form>
    </Modal>
  );
}
