import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateFacilityMutation, useGetFacilityTypesQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Facility name is required'),
  typeId: z.string().min(1, 'Property type is required'),
  location: z.string().min(2, 'Location is required'),
  floors: z.string().min(1, 'Number of floors is required'),
  capacity: z.string().min(1, 'Capacity is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFacilityModal({ isOpen, onClose }: Props) {
  const [createFacility, { isLoading }] = useCreateFacilityMutation();
  const { data: types = [] } = useGetFacilityTypesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedType = types.find((t) => t.id === data.typeId);
      await createFacility({
        ...data,
        type: { name: selectedType?.name ?? 'Other' },
        floors: Number(data.floors),
        capacity: Number(data.capacity),
        occupancy: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Facility registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register facility');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Facility">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Facility/Building Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Headquarters Block C" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Property Type *</label>
          <select {...register('typeId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          {errors.typeId && <p className="text-sm text-destructive">{errors.typeId.message}</p>}
        </div>
        <Input label="Location Address *" {...register('location')} error={errors.location?.message} placeholder="e.g. Kigali HQ Campus" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Floors count *" type="number" {...register('floors')} error={errors.floors?.message} placeholder="e.g. 5" />
          <Input label="Total Capacity (Personnel) *" type="number" {...register('capacity')} error={errors.capacity?.message} placeholder="e.g. 500" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Facility</Button>
        </div>
      </form>
    </Modal>
  );
}
