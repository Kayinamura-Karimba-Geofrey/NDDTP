import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateFacilityTypeMutation } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.enum(['BARRACKS', 'OFFICE', 'TRAINING', 'MEDICAL', 'WAREHOUSE', 'OTHER']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFacilityTypeModal({ isOpen, onClose }: Props) {
  const [createType, { isLoading }] = useCreateFacilityTypeMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createType({
        ...data,
        facilityCount: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Facility property type registered');
      onClose();
    } catch {
      toast.error('Failed to create facility type');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Property Type">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Type Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Helicopter Hangar" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Category *</label>
          <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="OFFICE">Office Block</option>
            <option value="BARRACKS">Troop Barracks</option>
            <option value="TRAINING">Training Grounds / Halls</option>
            <option value="MEDICAL">Medical Bay / Clinic</option>
            <option value="WAREHOUSE">Warehouse / Depot</option>
            <option value="OTHER">Other Specialty Facility</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Type</Button>
        </div>
      </form>
    </Modal>
  );
}
