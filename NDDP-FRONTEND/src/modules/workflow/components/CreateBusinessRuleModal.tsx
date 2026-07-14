import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateBusinessRuleMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Rule name is required'),
  condition: z.string().min(3, 'Condition statement is required'),
  action: z.string().min(3, 'Action to perform is required'),
  category: z.string().min(1, 'Associated domain is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBusinessRuleModal({ isOpen, onClose }: Props) {
  const [createRule, { isLoading }] = useCreateBusinessRuleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createRule({
        ...data,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Business rule established');
      onClose();
    } catch {
      toast.error('Failed to create rule');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish Business Rule">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Rule Title *" {...register('name')} error={errors.name?.message} placeholder="e.g. High Value PO" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Procurement">Procurement</option>
              <option value="Personnel">Personnel / HR</option>
              <option value="Finance">Finance</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Medical">Medical Bay</option>
              <option value="DMS">DMS Records</option>
            </select>
          </div>
        </div>
        <Input label="Condition Statement *" {...register('condition')} error={errors.condition?.message} placeholder="e.g. IF Amount > 10,000,000 RWF" />
        <Input label="Action to Perform *" {...register('action')} error={errors.action?.message} placeholder="e.g. Require Director Approval" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Rule</Button>
        </div>
      </form>
    </Modal>
  );
}
