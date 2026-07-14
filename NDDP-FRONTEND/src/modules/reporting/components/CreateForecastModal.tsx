import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateForecastMutation } from '../api/reporting.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  domain: z.string().min(1, 'Domain category is required'),
  horizon: z.string().min(1, 'Forecast horizon details is required'),
  method: z.string().min(2, 'Forecasting method/model is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateForecastModal({ isOpen, onClose }: Props) {
  const [createForecast, { isLoading }] = useCreateForecastMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createForecast({
        ...data,
        confidence: '90%',
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Forecasting analysis task scheduled');
      onClose();
    } catch {
      toast.error('Failed to create forecast analysis');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Forecast Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Forecast Task Title *" {...register('name')} error={errors.name?.message} placeholder="e.g. Budget Forecasting" />
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Domain Module *</label>
            <select {...register('domain')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Finance">Finance</option>
              <option value="Training">Training</option>
              <option value="Personnel">Personnel / HR</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Inventory">Inventory</option>
            </select>
          </div>
          <Input label="Horizon Timeframe *" {...register('horizon')} error={errors.horizon?.message} placeholder="e.g. 12 months" />
          <Input label="Algorithm Model *" {...register('method')} error={errors.method?.message} placeholder="e.g. Moving Average / Seasonal" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Run Forecast</Button>
        </div>
      </form>
    </Modal>
  );
}
