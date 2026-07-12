import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePublicHolidayMutation } from '../api/leave.api';
import toast from 'react-hot-toast';

const holidaySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

interface CreateHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateHolidayModal({ isOpen, onClose }: CreateHolidayModalProps) {
  const [createHoliday, { isLoading }] = useCreatePublicHolidayMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: { name: '', date: '', description: '' },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: HolidayFormValues) => {
    try {
      await createHoliday(data).unwrap();
      toast.success('Public holiday created successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to create holiday');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Public Holiday">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input label="Holiday Name" {...register('name')} error={errors.name?.message} />
        </div>
        <div>
          <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
        </div>
        <div>
          <Input label="Description (Optional)" {...register('description')} error={errors.description?.message} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Holiday'}</Button>
        </div>
      </form>
    </Modal>
  );
}
