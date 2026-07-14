import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateVisitSiteMutation } from '../api/visitor.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Site name is required'),
  type: z.enum(['HQ', 'BASE', 'CLINIC', 'WAREHOUSE', 'OTHER']),
  location: z.string().min(2, 'Location details are required'),
  capacity: z.string().min(1, 'Capacity details is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVisitSiteModal({ isOpen, onClose }: Props) {
  const [createSite, { isLoading }] = useCreateVisitSiteMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createSite({
        ...data,
        capacity: Number(data.capacity),
        activeVisits: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Site location registered successfully');
      onClose();
    } catch {
      toast.error('Failed to create site location');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Visit Site Gate">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Site Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. HQ Main Gate" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Site Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="HQ">Headquarters (HQ)</option>
              <option value="BASE">Military Base</option>
              <option value="CLINIC">Medical Bay</option>
              <option value="WAREHOUSE">Warehouse / Depot</option>
              <option value="OTHER">Other Location</option>
            </select>
          </div>
          <Input label="Gate Capacity *" type="number" {...register('capacity')} error={errors.capacity?.message} placeholder="e.g. 80" />
        </div>
        <Input label="Location Address Details *" {...register('location')} error={errors.location?.message} placeholder="e.g. Kigali HQ, Office block" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Gate Site</Button>
        </div>
      </form>
    </Modal>
  );
}
