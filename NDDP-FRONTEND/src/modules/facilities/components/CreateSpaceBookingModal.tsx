import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSpaceBookingMutation, useGetFacilitySpacesQuery } from '../api/facilities.api';
import toast from 'react-hot-toast';

const schema = z.object({
  spaceId: z.string().min(1, 'Please select a space'),
  requester: z.string().min(2, 'Requester name is required'),
  purpose: z.string().min(5, 'Purpose description must be at least 5 characters'),
  startAt: z.string().min(1, 'Start date and time is required'),
  endAt: z.string().min(1, 'End date and time is required'),
  attendees: z.string().min(1, 'Attendees count is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSpaceBookingModal({ isOpen, onClose }: Props) {
  const [createBooking, { isLoading }] = useCreateSpaceBookingMutation();
  const { data: spaces = [] } = useGetFacilitySpacesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedSpace = spaces.find((s) => s.id === data.spaceId);
      await createBooking({
        ...data,
        space: {
          name: selectedSpace?.name ?? '—',
          facility: { name: selectedSpace?.facility ?? '—' },
        },
        attendees: Number(data.attendees),
        status: 'PENDING',
      }).unwrap();
      toast.success('Room booking request submitted');
      onClose();
    } catch {
      toast.error('Failed to submit room booking');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Facility Space">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Space *</label>
            <select {...register('spaceId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {spaces.filter((s) => s.status === 'AVAILABLE').map((s) => (
                <option key={s.id} value={s.id}>{s.facility} — {s.name} (Cap: {s.capacity})</option>
              ))}
            </select>
            {errors.spaceId && <p className="text-sm text-destructive">{errors.spaceId.message}</p>}
          </div>
          <Input label="Requester *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. COO Office" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Start Date/Time *" type="datetime-local" {...register('startAt')} error={errors.startAt?.message} />
          <Input label="End Date/Time *" type="datetime-local" {...register('endAt')} error={errors.endAt?.message} />
          <Input label="Attendees *" type="number" {...register('attendees')} error={errors.attendees?.message} placeholder="e.g. 10" />
        </div>
        <Input label="Purpose of Booking *" {...register('purpose')} error={errors.purpose?.message} placeholder="e.g. Budget review workshop" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Booking</Button>
        </div>
      </form>
    </Modal>
  );
}
