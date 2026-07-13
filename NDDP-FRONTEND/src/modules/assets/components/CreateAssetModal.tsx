import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAssetMutation, useGetAssetCategoriesQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Asset name is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(2, 'Asset type is required'),
  serialNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  department: z.string().min(2, 'Department is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAssetModal({ isOpen, onClose }: Props) {
  const [createAsset, { isLoading }] = useCreateAssetMutation();
  const { data: categories = [] } = useGetAssetCategoriesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createAsset(data).unwrap();
      toast.success('Asset registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register asset');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Asset">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Asset Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Dell Latitude 5540" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <Input label="Type *" {...register('type')} error={errors.type?.message} placeholder="e.g. Laptop" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Manufacturer" {...register('manufacturer')} />
          <Input label="Model" {...register('model')} />
          <Input label="Serial Number" {...register('serialNumber')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
          <Input label="Location *" {...register('location')} error={errors.location?.message} placeholder="e.g. Kigali HQ — Floor 3" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
