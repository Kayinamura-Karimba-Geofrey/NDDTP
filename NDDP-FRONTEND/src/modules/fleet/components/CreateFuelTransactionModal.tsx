import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useRecordFuelTransactionMutation, useGetFleetVehiclesQuery, useGetFleetDriversQuery } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  driverId: z.string().min(1, 'Driver is required'),
  station: z.string().min(2, 'Refueling station is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  quantity: z.string().min(1, 'Liters quantity is required'),
  cost: z.string().min(1, 'Total cost is required'),
  odometer: z.string().min(1, 'Current odometer reading is required'),
  date: z.string().min(1, 'Transaction date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFuelTransactionModal({ isOpen, onClose }: Props) {
  const [recordFuel, { isLoading }] = useRecordFuelTransactionMutation();
  const { data } = useGetFleetVehiclesQuery({ page: 1, limit: 100 });
  const vehicles = data?.data ?? [];
  const { data: drivers = [] } = useGetFleetDriversQuery();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);
      const selectedDriver = drivers.find((d) => d.id === data.driverId);
      await recordFuel({
        ...data,
        vehicle: selectedVehicle?.fleetNumber ?? '—',
        driver: selectedDriver?.fullName ?? '—',
        quantity: Number(data.quantity),
        cost: Number(data.cost),
        odometer: Number(data.odometer),
        transactionNumber: `FUEL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      }).unwrap();
      toast.success('Fuel transaction recorded');
      onClose();
    } catch {
      toast.error('Failed to record fuel transaction');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refuel Vehicle">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Driver *</label>
            <select {...register('driverId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>{d.driverNumber} — {d.fullName}</option>
              ))}
            </select>
            {errors.driverId && <p className="text-sm text-destructive">{errors.driverId.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Refueling Station *" {...register('station')} error={errors.station?.message} placeholder="e.g. Kobil Remera" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Fuel Type *</label>
            <select {...register('fuelType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Quantity (Liters) *" type="number" {...register('quantity')} error={errors.quantity?.message} placeholder="e.g. 80" />
          <Input label="Cost (RWF) *" type="number" {...register('cost')} error={errors.cost?.message} placeholder="e.g. 128000" />
          <Input label="Odometer (Km) *" type="number" {...register('odometer')} error={errors.odometer?.message} placeholder="e.g. 45200" />
        </div>
        <Input label="Transaction Date *" type="date" {...register('date')} error={errors.date?.message} />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record refueling</Button>
        </div>
      </form>
    </Modal>
  );
}
