import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePreventiveScheduleMutation } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  asset: z.string().min(2, 'Asset reference is required'),
  frequency: z.string().min(1, 'Frequency description is required'),
  nextDue: z.string().min(1, 'Next due date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePreventiveScheduleModal({ isOpen, onClose }: Props) {
  const [createPM, { isLoading }] = useCreatePreventiveScheduleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPM({
        ...data,
        status: 'SCHEDULED',
      }).unwrap();
      toast.success('Preventive task scheduled');
      onClose();
    } catch {
      toast.error('Failed to schedule preventive task');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Preventive Schedule">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Asset Reference *" {...register('asset')} error={errors.asset?.message} placeholder="e.g. GEN-01" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Frequency *" {...register('frequency')} error={errors.frequency?.message} placeholder="e.g. Monthly / Quarterly" />
          <Input label="Next Due Date *" type="date" {...register('nextDue')} error={errors.nextDue?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Schedule</Button>
        </div>
      </form>
    </Modal>
  );
}
