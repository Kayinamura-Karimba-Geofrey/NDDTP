import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useRecordInspectionMutation, useGetFleetVehiclesQuery } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  date: z.string().min(1, 'Inspection date is required'),
  inspector: z.string().min(2, 'Inspector name is required'),
  result: z.enum(['PASSED', 'REQUIRES_REPAIR', 'FAILED']),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVehicleInspectionModal({ isOpen, onClose }: Props) {
  const [recordInspection, { isLoading }] = useRecordInspectionMutation();
  const { data } = useGetFleetVehiclesQuery({ page: 1, limit: 100 });
  const vehicles = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);
      await recordInspection({
        ...data,
        vehicle: selectedVehicle?.fleetNumber ?? '—',
        inspectionNumber: `INSP-2026-${Math.floor(100 + Math.random() * 900)}`,
      }).unwrap();
      toast.success('Inspection report saved successfully');
      onClose();
    } catch {
      toast.error('Failed to record inspection');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Vehicle Inspection">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Vehicle *</label>
          <select {...register('vehicleId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>{v.fleetNumber} — {v.make} {v.model} ({v.registrationNumber})</option>
            ))}
          </select>
          {errors.vehicleId && <p className="text-sm text-destructive">{errors.vehicleId.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Inspector Name *" {...register('inspector')} error={errors.inspector?.message} placeholder="e.g. Fleet Officer" />
          <Input label="Inspection Date *" type="date" {...register('date')} error={errors.date?.message} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Inspection Result *</label>
          <select {...register('result')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="PASSED">PASSED</option>
            <option value="REQUIRES_REPAIR">REQUIRES REPAIR</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <Input label="Inspection Notes / Comments" {...register('notes')} placeholder="e.g. All systems OK, lights check" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Inspection</Button>
        </div>
      </form>
    </Modal>
  );
}
