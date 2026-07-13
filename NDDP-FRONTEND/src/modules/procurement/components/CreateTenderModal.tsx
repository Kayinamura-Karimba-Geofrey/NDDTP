import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateTenderMutation } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  budget: z.string().min(1, 'Budget value is required'),
  submissionDeadline: z.string().min(1, 'Deadline date is required'),
  openingDate: z.string().min(1, 'Opening date is required'),
  committee: z.string().min(2, 'Evaluation committee name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTenderModal({ isOpen, onClose }: Props) {
  const [createTender, { isLoading }] = useCreateTenderMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createTender({
        ...data,
        budget: Number(data.budget),
        tenderNumber: `TND-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'PUBLISHED',
      }).unwrap();
      toast.success('Tender published successfully');
      onClose();
    } catch {
      toast.error('Failed to publish tender');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish New Tender">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Tender Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Fleet Vehicle Acquisition" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Allocated Budget (RWF) *" type="number" {...register('budget')} error={errors.budget?.message} placeholder="e.g. 85000000" />
          <Input label="Evaluation Committee *" {...register('committee')} error={errors.committee?.message} placeholder="e.g. Works Committee" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Submission Deadline *" type="date" {...register('submissionDeadline')} error={errors.submissionDeadline?.message} />
          <Input label="Opening Date *" type="date" {...register('openingDate')} error={errors.openingDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Publish Tender</Button>
        </div>
      </form>
    </Modal>
  );
}
