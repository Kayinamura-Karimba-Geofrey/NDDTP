import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateKpiMutation } from '../api/reporting.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  owner: z.string().min(2, 'Owner role is required'),
  domain: z.string().min(1, 'Domain category is required'),
  formula: z.string().min(3, 'Formula details is required'),
  target: z.string().min(1, 'Target metric is required'),
  frequency: z.enum(['Weekly', 'Monthly', 'Quarterly', 'Annual']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateKpiModal({ isOpen, onClose }: Props) {
  const [createKpi, { isLoading }] = useCreateKpiMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createKpi({
        ...data,
        actual: '—',
        trend: '→',
        thresholds: '—',
        status: 'ACTIVE',
      }).unwrap();
      toast.success('KPI target configured successfully');
      onClose();
    } catch {
      toast.error('Failed to configure KPI');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure KPI Metric">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="KPI Metric Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Staff Strength" />
          <Input label="Owner / Lead *" {...register('owner')} error={errors.owner?.message} placeholder="e.g. HR Director" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Domain Module *</label>
            <select {...register('domain')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Personnel">Personnel</option>
              <option value="Finance">Finance</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Training">Training</option>
              <option value="Procurement">Procurement</option>
              <option value="Performance">Performance</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Review Frequency *</label>
            <select {...register('frequency')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Formula / logic *" {...register('formula')} error={errors.formula?.message} placeholder="e.g. Headcount / Authorized" />
          <Input label="Target Value *" {...register('target')} error={errors.target?.message} placeholder="e.g. 90% / 100%" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save KPI</Button>
        </div>
      </form>
    </Modal>
  );
}
