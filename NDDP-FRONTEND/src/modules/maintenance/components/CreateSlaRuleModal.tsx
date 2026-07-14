import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSlaRuleMutation } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  responseHours: z.string().min(1, 'Response timeframe in hours is required'),
  resolutionHours: z.string().min(1, 'Resolution timeframe in hours is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSlaRuleModal({ isOpen, onClose }: Props) {
  const [createSla, { isLoading }] = useCreateSlaRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createSla({
        ...data,
        responseHours: Number(data.responseHours),
        resolutionHours: Number(data.resolutionHours),
        compliance: '100%',
        status: 'ACTIVE',
      }).unwrap();
      toast.success('SLA priority rule saved');
      onClose();
    } catch {
      toast.error('Failed to save SLA rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish SLA Rule">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Priority Class *</label>
          <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Response Target (Hours) *" type="number" {...register('responseHours')} error={errors.responseHours?.message} placeholder="e.g. 1" />
          <Input label="Resolution Target (Hours) *" type="number" {...register('resolutionHours')} error={errors.resolutionHours?.message} placeholder="e.g. 4" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save SLA Rule</Button>
        </div>
      </form>
    </Modal>
  );
}
