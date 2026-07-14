import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateApprovalChainMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Chain name is required'),
  service: z.string().min(1, 'Associated service is required'),
  type: z.enum(['Sequential', 'Parallel', 'Conditional']),
  levelsRaw: z.string().min(2, 'Approver stages (comma separated) is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateApprovalChainModal({ isOpen, onClose }: Props) {
  const [createChain, { isLoading }] = useCreateApprovalChainMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createChain({
        ...data,
        levels: data.levelsRaw.split(',').map((x) => x.trim()),
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Approval chain established successfully');
      onClose();
    } catch {
      toast.error('Failed to create approval chain');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish Approval Chain">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Chain Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Standard Leave Chain" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Service Domain *</label>
            <select {...register('service')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Personnel">Personnel / HR</option>
              <option value="Procurement">Procurement</option>
              <option value="Finance">Finance</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Medical">Medical Bay</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Chain Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Sequential">Sequential (One by one)</option>
              <option value="Parallel">Parallel (All together)</option>
              <option value="Conditional">Conditional (Depending on value)</option>
            </select>
          </div>
        </div>
        <Input label="Approver Stages (Comma-separated) *" {...register('levelsRaw')} error={errors.levelsRaw?.message} placeholder="e.g. Employee, Supervisor, HR Officer, Completed" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Chain</Button>
        </div>
      </form>
    </Modal>
  );
}
