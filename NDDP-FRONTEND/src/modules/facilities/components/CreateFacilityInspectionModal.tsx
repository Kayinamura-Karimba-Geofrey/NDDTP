import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateFacilityInspectionMutation, useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  facilityId: z.string().min(1, 'Facility is required'),
  type: z.string().min(2, 'Inspection category/type is required'),
  scheduledAt: z.string().min(1, 'Scheduled date is required'),
  inspector: z.string().min(2, 'Inspector name is required'),
  findings: z.string().min(2, 'Findings description is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFacilityInspectionModal({ isOpen, onClose }: Props) {
  const [createInsp, { isLoading }] = useCreateFacilityInspectionMutation();
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedFacility = facilities.find((f) => f.id === data.facilityId);
      await createInsp({
        ...data,
        facility: selectedFacility?.name ?? '—',
        status: 'PENDING',
      }).unwrap();
      toast.success('Facility inspection scheduled');
      onClose();
    } catch {
      toast.error('Failed to schedule facility inspection');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Facility Inspection">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
          <Input label="Inspection Type *" {...register('type')} error={errors.type?.message} placeholder="e.g. Fire Safety / Structural" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Scheduled Date *" type="date" {...register('scheduledAt')} error={errors.scheduledAt?.message} />
          <Input label="Inspector Name *" {...register('inspector')} error={errors.inspector?.message} placeholder="e.g. Safety Officer" />
        </div>
        <Input label="Findings / Actions Required *" {...register('findings')} error={errors.findings?.message} placeholder="e.g. Minor cracks — monitor" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Log Inspection</Button>
        </div>
      </form>
    </Modal>
  );
}
