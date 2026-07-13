import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateVehicleMutation } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  registrationNumber: z.string().min(4, 'Registration number (Plate) is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  make: z.string().min(2, 'Make is required'),
  model: z.string().min(2, 'Model is required'),
  year: z.string().min(4, 'Year of manufacture is required'),
  vin: z.string().optional(),
  color: z.string().optional(),
  fuelType: z.string().min(1, 'Fuel type is required'),
  odometer: z.string().min(1, 'Initial odometer is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVehicleModal({ isOpen, onClose }: Props) {
  const [createVehicle, { isLoading }] = useCreateVehicleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createVehicle({
        ...data,
        year: Number(data.year),
        odometer: Number(data.odometer),
        fleetNumber: `FLT-${Math.floor(100 + Math.random() * 900)}`,
        status: 'AVAILABLE',
        condition: 'Excellent',
      }).unwrap();
      toast.success('Vehicle registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register vehicle');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Vehicle">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Plate Number *" {...register('registrationNumber')} error={errors.registrationNumber?.message} placeholder="e.g. RAD-482-A" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Vehicle Type *</label>
            <select {...register('vehicleType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Passenger">Passenger Sedan/SUV</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Truck">Logistics Truck</option>
              <option value="Bus">Personnel Bus</option>
              <option value="Motorcycle">Security Patrol Motorcycle</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Make *" {...register('make')} error={errors.make?.message} placeholder="e.g. Toyota" />
          <Input label="Model *" {...register('model')} error={errors.model?.message} placeholder="e.g. Land Cruiser" />
          <Input label="Year *" type="number" {...register('year')} error={errors.year?.message} placeholder="e.g. 2022" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="VIN / Chassis Number" {...register('vin')} placeholder="e.g. JTEBU5JR5..." />
          <Input label="Color" {...register('color')} placeholder="e.g. White" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Fuel Type *</label>
            <select {...register('fuelType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <Input label="Odometer (Km) *" type="number" {...register('odometer')} error={errors.odometer?.message} placeholder="e.g. 1500" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Vehicle</Button>
        </div>
      </form>
    </Modal>
  );
}
