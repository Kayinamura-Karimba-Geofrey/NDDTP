import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateProcurementPlanMutation } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  financialYear: z.string().min(4, 'Financial year is required'),
  department: z.string().min(2, 'Department is required'),
  category: z.string().min(1, 'Category is required'),
  estimatedBudget: z.string().min(1, 'Estimated budget is required'),
  priority: z.enum(['Low', 'Medium', 'High']),
  responsibleOfficer: z.string().min(2, 'Responsible officer name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProcurementPlanModal({ isOpen, onClose }: Props) {
  const [createPlan, { isLoading }] = useCreateProcurementPlanMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPlan({
        ...data,
        estimatedBudget: Number(data.estimatedBudget),
        planNumber: `PP-FY2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'APPROVED',
      }).unwrap();
      toast.success('Procurement plan registered successfully');
      onClose();
    } catch {
      toast.error('Failed to create procurement plan');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Procurement Plan Item">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Financial Year *" {...register('financialYear')} error={errors.financialYear?.message} placeholder="e.g. 2025/2026" />
          <Input label="Department Name *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Category *</label>
          <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="IT Equipment">IT Equipment</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Construction">Construction</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Estimated Budget (RWF) *" type="number" {...register('estimatedBudget')} error={errors.estimatedBudget?.message} placeholder="e.g. 450000000" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority *</label>
            <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <Input label="Responsible Officer *" {...register('responsibleOfficer')} error={errors.responsibleOfficer?.message} placeholder="e.g. Alice Uwase" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Plan Item</Button>
        </div>
      </form>
    </Modal>
  );
}
