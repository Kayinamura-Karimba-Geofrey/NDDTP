import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateCalendarMutation } from '../api/calendar.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  type: z.enum(['ORGANIZATIONAL', 'DEPARTMENT', 'PERSONAL']),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCalendarModal({ isOpen, onClose }: Props) {
  const [createCalendar, { isLoading }] = useCreateCalendarMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCalendar({
        ...data,
        owner: 'You',
        eventCount: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Calendar layer configured successfully');
      onClose();
    } catch {
      toast.error('Failed to configure calendar');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Calendar Layer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Calendar Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. HR Department Events" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Calendar Class Type *</label>
          <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="ORGANIZATIONAL">Organizational (Global)</option>
            <option value="DEPARTMENT">Departmental (Team-level)</option>
            <option value="PERSONAL">Personal Calendar</option>
          </select>
        </div>
        <Input label="Description" {...register('description')} placeholder="e.g. Leave, training, and recruitment schedules" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Calendar</Button>
        </div>
      </form>
    </Modal>
  );
}
