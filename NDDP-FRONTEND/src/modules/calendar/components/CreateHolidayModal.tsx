import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateHolidayMutation } from '../api/calendar.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Holiday name is required'),
  date: z.string().min(1, 'Holiday date is required'),
  type: z.enum(['National', 'Organizational']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateHolidayModal({ isOpen, onClose }: Props) {
  const [createHoliday, { isLoading }] = useCreateHolidayMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createHoliday({
        ...data,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Holiday scheduled successfully');
      onClose();
    } catch {
      toast.error('Failed to create holiday entry');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Holiday Calendar Day">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Holiday Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Liberation Day" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Holiday Date *" type="date" {...register('date')} error={errors.date?.message} />
          <div className="space-y-1">
            <label className="text-sm font-medium">Holiday Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="National">National Public Holiday</option>
              <option value="Organizational">Organizational Day Off</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Holiday</Button>
        </div>
      </form>
    </Modal>
  );
}
