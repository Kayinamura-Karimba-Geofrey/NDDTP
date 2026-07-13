import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateAssignmentMutation, useGetFleetVehiclesQuery, useGetFleetDriversQuery } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  driverId: z.string().min(1, 'Please select a driver'),
  assignmentDate: z.string().min(1, 'Assignment date is required'),
  expectedReturn: z.string().optional(),
  purpose: z.string().min(2, 'Purpose is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVehicleAssignmentModal({ isOpen, onClose }: Props) {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
  const { data } = useGetFleetVehiclesQuery({ page: 1, limit: 100 });
  const vehicles = data?.data ?? [];
  const { data: drivers = [] } = useGetFleetDriversQuery();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);
      const selectedDriver = drivers.find((d) => d.id === data.driverId);
      await createAssignment({
        ...data,
        vehicle: `${selectedVehicle?.fleetNumber} / ${selectedVehicle?.registrationNumber}`,
        driver: selectedDriver?.fullName ?? '—',
        department: selectedDriver?.department ?? '—',
        status: 'ASSIGNED',
      }).unwrap();
      toast.success('Driver assigned successfully');
      onClose();
    } catch {
      toast.error('Failed to assign driver');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Driver to Vehicle">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Vehicle *</label>
          <select {...register('vehicleId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {vehicles.filter((v) => v.status === 'AVAILABLE').map((v) => (
              <option key={v.id} value={v.id}>{v.fleetNumber} — {v.make} {v.model} ({v.registrationNumber})</option>
            ))}
          </select>
          {errors.vehicleId && <p className="text-sm text-destructive">{errors.vehicleId.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Driver *</label>
          <select {...register('driverId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {drivers.filter((d) => d.status === 'ACTIVE').map((d) => (
              <option key={d.id} value={d.id}>{d.driverNumber} — {d.fullName} ({d.department})</option>
            ))}
          </select>
          {errors.driverId && <p className="text-sm text-destructive">{errors.driverId.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Assignment Date *" type="date" {...register('assignmentDate')} error={errors.assignmentDate?.message} />
          <Input label="Expected Return" type="date" {...register('expectedReturn')} />
        </div>
        <Input label="Purpose of Assignment *" {...register('purpose')} error={errors.purpose?.message} placeholder="e.g. Patrol duty" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Assign Vehicle</Button>
        </div>
      </form>
    </Modal>
  );
}
