import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateUtilityReadingMutation, useGetFacilitiesDirectoryQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  facilityId: z.string().min(1, 'Facility is required'),
  utility: z.string().min(2, 'Utility type is required'),
  period: z.string().min(2, 'Billing period is required'),
  consumption: z.string().min(1, 'Consumption value is required'),
  cost: z.string().min(1, 'Cost in RWF is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUtilityReadingModal({ isOpen, onClose }: Props) {
  const [createUtility, { isLoading }] = useCreateUtilityReadingMutation();
  const { data: facilities = [] } = useGetFacilitiesDirectoryQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedFacility = facilities.find((f) => f.id === data.facilityId);
      await createUtility({
        ...data,
        facility: selectedFacility?.name ?? '—',
        cost: `RWF ${(Number(data.cost) / 1e6).toFixed(1)}M`,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Utility invoice logged');
      onClose();
    } catch {
      toast.error('Failed to log utility reading');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Utility Reading">
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
          <Input label="Utility Type *" {...register('utility')} error={errors.utility?.message} placeholder="e.g. Electricity / Water" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Billing Period *" {...register('period')} error={errors.period?.message} placeholder="e.g. Jun 2026" />
          <Input label="Consumption reading *" {...register('consumption')} error={errors.consumption?.message} placeholder="e.g. 84,200 kWh" />
          <Input label="Cost (RWF) *" type="number" {...register('cost')} error={errors.cost?.message} placeholder="e.g. 12400000" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Invoice</Button>
        </div>
      </form>
    </Modal>
  );
}
