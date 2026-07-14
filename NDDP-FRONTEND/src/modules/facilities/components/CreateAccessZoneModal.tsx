import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAccessZoneMutation, useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Access zone name is required'),
  facilityId: z.string().min(1, 'Facility is required'),
  clearance: z.string().min(2, 'Security clearance level is required'),
  activeCredentials: z.string().min(1, 'Initial credentials count is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccessZoneModal({ isOpen, onClose }: Props) {
  const [createZone, { isLoading }] = useCreateAccessZoneMutation();
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedFacility = facilities.find((f) => f.id === data.facilityId);
      await createZone({
        ...data,
        facility: selectedFacility?.name ?? '—',
        activeCredentials: Number(data.activeCredentials),
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Access control zone established');
      onClose();
    } catch {
      toast.error('Failed to establish access zone');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish Access Zone">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Zone Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. HQ Restricted Floor" />
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
        <div className="grid grid-cols-2 gap-4">
          <Input label="Clearance Required *" {...register('clearance')} error={errors.clearance?.message} placeholder="e.g. SECRET" />
          <Input label="Active Credentials *" type="number" {...register('activeCredentials')} error={errors.activeCredentials?.message} placeholder="e.g. 10" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Zone</Button>
        </div>
      </form>
    </Modal>
  );
}
