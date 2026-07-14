import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateFacilitySpaceMutation, useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Space name is required'),
  facilityId: z.string().min(1, 'Facility building is required'),
  type: z.enum(['ROOM', 'HALL', 'OFFICE', 'STORAGE', 'LAB', 'OTHER']),
  capacity: z.string().min(1, 'Capacity is required'),
  floor: z.string().min(1, 'Floor tag is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFacilitySpaceModal({ isOpen, onClose }: Props) {
  const [createSpace, { isLoading }] = useCreateFacilitySpaceMutation();
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedFacility = facilities.find((f) => f.id === data.facilityId);
      await createSpace({
        ...data,
        facility: { name: selectedFacility?.name ?? 'Other' },
        capacity: Number(data.capacity),
        status: 'AVAILABLE',
      }).unwrap();
      toast.success('Facility space registered successfully');
      onClose();
    } catch {
      toast.error('Failed to create space');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Space Room/Hall">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Space Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Conference Room B" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Facility *</label>
            <select {...register('facilityId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            {errors.facilityId && <p className="text-sm text-destructive">{errors.facilityId.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Space Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="ROOM">Meeting Room</option>
              <option value="HALL">Training/Briefing Hall</option>
              <option value="OFFICE">Assigned Office</option>
              <option value="STORAGE">Secure Depot Room</option>
              <option value="LAB">Research Lab</option>
              <option value="OTHER">Other Specialty</option>
            </select>
          </div>
          <Input label="Capacity *" type="number" {...register('capacity')} error={errors.capacity?.message} placeholder="e.g. 15" />
          <Input label="Floor *" {...register('floor')} error={errors.floor?.message} placeholder="e.g. 2F" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Space</Button>
        </div>
      </form>
    </Modal>
  );
}
