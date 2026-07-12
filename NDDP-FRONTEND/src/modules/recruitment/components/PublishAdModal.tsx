import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { usePublishAdMutation } from '../api/recruitment.api';
import toast from 'react-hot-toast';

const adSchema = z.object({
  vacancyNumber: z.string().min(1, 'Vacancy is required'),
  channels: z.string().min(2, 'Channels are required'),
  budget: z.number().min(0, 'Budget must be positive'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type AdFormValues = z.infer<typeof adSchema>;

interface PublishAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublishAdModal({ isOpen, onClose }: PublishAdModalProps) {
  const [publishAd, { isLoading }] = usePublishAdMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      vacancyNumber: '',
      channels: '',
      budget: 0,
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: AdFormValues) => {
    try {
      await publishAd(data).unwrap();
      toast.success('Advertisement successfully scheduled for publication');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to publish advertisement');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publish Job Advertisement"
      description="Select channels to advertise an open vacancy."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Vacancy <span className="text-destructive">*</span></label>
          <select
            {...register('vacancyNumber')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an Approved Vacancy</option>
            <option value="VAC-101">VAC-101 - Infantry Officer</option>
            <option value="VAC-102">VAC-102 - Cyber Specialist</option>
            <option value="VAC-103">VAC-103 - Logistics Coordinator</option>
          </select>
          {errors.vacancyNumber && <p className="text-xs text-destructive">{errors.vacancyNumber.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Publishing Channels (comma separated) <span className="text-destructive">*</span></label>
          <Input {...register('channels')} placeholder="e.g. MOD Portal, LinkedIn, Local Newspaper" />
          {errors.channels && <p className="text-xs text-destructive">{errors.channels.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Advertising Budget (FRW) <span className="text-destructive">*</span></label>
          <Input type="number" {...register('budget', { valueAsNumber: true })} min={0} step={1000} />
          {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Start Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('startDate')} />
            {errors.startDate && <p className="text-xs text-destructive">{errors.startDate.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">End Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('endDate')} />
            {errors.endDate && <p className="text-xs text-destructive">{errors.endDate.message}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Advertisement'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
