import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateTripMutation } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  requester: z.string().min(2, 'Requester name is required'),
  department: z.string().min(2, 'Department is required'),
  destination: z.string().min(2, 'Destination is required'),
  purpose: z.string().min(5, 'Purpose must be at least 5 characters'),
  departureDate: z.string().min(1, 'Departure date is required'),
  returnDate: z.string().optional(),
  passengers: z.string().min(1, 'Passenger count is required'),
  priority: z.enum(['Normal', 'Urgent', 'Critical']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTripRequestModal({ isOpen, onClose }: Props) {
  const [createTrip, { isLoading }] = useCreateTripMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createTrip({
        ...data,
        passengers: Number(data.passengers),
        tripNumber: `TRP-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'PENDING',
      }).unwrap();
      toast.success('Trip request submitted');
      onClose();
    } catch {
      toast.error('Failed to submit trip request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Trip Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Requester Name *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. Marie Uwase" />
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. HR" />
        </div>
        <Input label="Destination *" {...register('destination')} error={errors.destination?.message} placeholder="e.g. Gako Training Centre" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Departure Date *" type="date" {...register('departureDate')} error={errors.departureDate?.message} />
          <Input label="Return Date" type="date" {...register('returnDate')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Passengers Count *" type="number" {...register('passengers')} error={errors.passengers?.message} placeholder="e.g. 4" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority *</label>
            <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <Input label="Purpose of Mission *" {...register('purpose')} error={errors.purpose?.message} placeholder="e.g. Training facilitation" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
}
