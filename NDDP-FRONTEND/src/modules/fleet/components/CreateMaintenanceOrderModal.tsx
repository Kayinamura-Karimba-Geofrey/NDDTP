import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateMaintenanceOrderMutation, useGetFleetVehiclesQuery } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  type: z.enum(['Preventive', 'Corrective']),
  provider: z.string().min(2, 'Maintenance provider/workshop is required'),
  cost: z.string().min(1, 'Estimated cost is required'),
  date: z.string().min(1, 'Scheduled date is required'),
  reason: z.string().min(5, 'Reason/Issue details must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMaintenanceOrderModal({ isOpen, onClose }: Props) {
  const [createMnt, { isLoading }] = useCreateMaintenanceOrderMutation();
  const { data } = useGetFleetVehiclesQuery({ page: 1, limit: 100 });
  const vehicles = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);
      await createMnt({
        ...data,
        vehicle: selectedVehicle?.fleetNumber ?? '—',
        cost: Number(data.cost),
        workOrder: `WO-FLT-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'SCHEDULED',
      }).unwrap();
      toast.success('Maintenance order created successfully');
      onClose();
    } catch {
      toast.error('Failed to schedule maintenance');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Maintenance">
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
          <div className="space-y-1">
            <label className="text-sm font-medium">Maintenance Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Preventive">Preventive (Routine Maintenance)</option>
              <option value="Corrective">Corrective (Repairs)</option>
            </select>
          </div>
          <Input label="Provider / Workshop *" {...register('provider')} error={errors.provider?.message} placeholder="e.g. Toyota Rwanda" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Estimated Cost (RWF) *" type="number" {...register('cost')} error={errors.cost?.message} placeholder="e.g. 120000" />
          <Input label="Scheduled Date *" type="date" {...register('date')} error={errors.date?.message} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason / Issue Description *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="e.g. Brake pad check, engine oil renewal..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Schedule</Button>
        </div>
      </form>
    </Modal>
  );
}
