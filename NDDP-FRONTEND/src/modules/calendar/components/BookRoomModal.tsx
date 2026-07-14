import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useBookRoomMutation } from '../api/calendar.api';
import toast from 'react-hot-toast';

const schema = z.object({
  room: z.string().min(2, 'Room name/code is required'),
  event: z.string().min(3, 'Event title to link is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time timeframe is required'),
  capacity: z.string().min(1, 'Room capacity target is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BookRoomModal({ isOpen, onClose }: Props) {
  const [bookRoom, { isLoading }] = useBookRoomMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await bookRoom({
        ...data,
        capacity: Number(data.capacity),
        status: 'BUSY',
      }).unwrap();
      toast.success('Room booking registered successfully');
      onClose();
    } catch {
      toast.error('Failed to book meeting room');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Meeting Room">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meeting Room *" {...register('room')} error={errors.room?.message} placeholder="e.g. HQ Boardroom" />
          <Input label="Room Capacity *" type="number" {...register('capacity')} error={errors.capacity?.message} placeholder="e.g. 20" />
        </div>
        <Input label="Link Event *" {...register('event')} error={errors.event?.message} placeholder="e.g. Leadership Stand-up" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Reservation Date *" type="date" {...register('date')} error={errors.date?.message} />
          <Input label="Time Window *" {...register('time')} error={errors.time?.message} placeholder="e.g. 09:00–09:30" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Reservation</Button>
        </div>
      </form>
    </Modal>
  );
}
