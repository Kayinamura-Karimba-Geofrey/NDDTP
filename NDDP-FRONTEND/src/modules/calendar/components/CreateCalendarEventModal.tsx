import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateCalendarEventMutation, useGetCalendarsQuery } from '../api/calendar.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Event title is required'),
  calendarId: z.string().min(1, 'Please select a calendar layer'),
  type: z.enum(['MEETING', 'TRAINING', 'CEREMONY', 'LEAVE_BLOCK', 'OTHER']),
  startAt: z.string().min(1, 'Start date & time is required'),
  endAt: z.string().min(1, 'End date & time is required'),
  location: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCalendarEventModal({ isOpen, onClose }: Props) {
  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();
  const { data: calendars = [] } = useGetCalendarsQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedCal = calendars.find((c) => c.id === data.calendarId);
      await createEvent({
        ...data,
        calendar: selectedCal?.name ?? 'Other',
        organizer: 'You',
        attendees: 1,
        status: 'SCHEDULED',
      }).unwrap();
      toast.success('Calendar event scheduled');
      onClose();
    } catch {
      toast.error('Failed to schedule event');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Calendar Event">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Event Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Q3 Stand-up Briefing" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Calendar *</label>
            <select {...register('calendarId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {calendars.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.calendarId && <p className="text-sm text-destructive">{errors.calendarId.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Event Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="MEETING">Meeting</option>
              <option value="TRAINING">Training Session</option>
              <option value="CEREMONY">Official Ceremony</option>
              <option value="LEAVE_BLOCK">Leave Block</option>
              <option value="OTHER">Other Event</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Starts At *" type="datetime-local" {...register('startAt')} error={errors.startAt?.message} />
          <Input label="Ends At *" type="datetime-local" {...register('endAt')} error={errors.endAt?.message} />
        </div>
        <Input label="Location / Venue Room" {...register('location')} placeholder="e.g. HQ Boardroom" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Event</Button>
        </div>
      </form>
    </Modal>
  );
}
