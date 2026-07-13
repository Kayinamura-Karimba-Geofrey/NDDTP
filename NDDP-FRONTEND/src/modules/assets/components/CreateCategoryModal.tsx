import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateCategoryMutation } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Category name is required'),
  code: z.string().min(2, 'Code is required'),
  description: z.string().min(5, 'Description is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCategoryModal({ isOpen, onClose }: Props) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCategory(data).unwrap();
      toast.success('Category created successfully');
      onClose();
    } catch {
      toast.error('Failed to create category');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Category">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Category Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Communications Equipment" />
        <Input label="Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. COM" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Description *</label>
          <textarea
            {...register('description')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.description ? 'border-destructive' : 'border-input'}`}
            placeholder="Category description..."
          />
          {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Category</Button>
        </div>
      </form>
    </Modal>
  );
}
