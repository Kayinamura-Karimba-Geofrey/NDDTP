import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateMaintenanceCategoryMutation } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMaintenanceCategoryModal({ isOpen, onClose }: Props) {
  const [createCategory, { isLoading }] = useCreateMaintenanceCategoryMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCategory({
        ...data,
        requestCount: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Maintenance category added');
      onClose();
    } catch {
      toast.error('Failed to create category');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Maintenance Category">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Category Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. HVAC Systems" />
        <Input label="Description *" {...register('description')} error={errors.description?.message} placeholder="e.g. Heating, ventilation, and air conditioning systems" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Category</Button>
        </div>
      </form>
    </Modal>
  );
}
