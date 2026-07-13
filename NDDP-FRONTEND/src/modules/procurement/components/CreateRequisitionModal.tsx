import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePurchaseRequisitionMutation } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(2, 'Department name is required'),
  requester: z.string().min(2, 'Requester name is required'),
  category: z.string().min(1, 'Category is required'),
  estimatedCost: z.string().min(1, 'Estimated cost is required'),
  priority: z.enum(['ROUTINE', 'URGENT', 'CRITICAL']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRequisitionModal({ isOpen, onClose }: Props) {
  const [createReq, { isLoading }] = useCreatePurchaseRequisitionMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createReq({
        ...data,
        estimatedCost: Number(data.estimatedCost),
        requisitionNumber: `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'PENDING_APPROVAL',
      }).unwrap();
      toast.success('Purchase requisition created');
      onClose();
    } catch {
      toast.error('Failed to create purchase requisition');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Purchase Requisition">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Requester *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. Dr. Claire Mutesi" />
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Medical" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Category *</label>
          <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="IT Equipment">IT Equipment</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Vehicle Parts">Vehicle Parts</option>
            <option value="Construction">Construction</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Estimated Cost (RWF) *" type="number" {...register('estimatedCost')} error={errors.estimatedCost?.message} placeholder="e.g. 45000000" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority *</label>
            <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="ROUTINE">Routine</option>
              <option value="URGENT">Urgent</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Requisition</Button>
        </div>
      </form>
    </Modal>
  );
}
