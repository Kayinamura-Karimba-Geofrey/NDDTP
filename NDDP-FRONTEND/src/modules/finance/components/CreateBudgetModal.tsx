import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateBudgetMutation } from '../api/finance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(2, 'Department name is required'),
  costCenter: z.string().min(2, 'Cost center code is required'),
  program: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  fiscalYear: z.string().min(4, 'Fiscal year is required'),
  allocatedAmount: z.string().min(1, 'Allocation amount is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBudgetModal({ isOpen, onClose }: Props) {
  const [createBudget, { isLoading }] = useCreateBudgetMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createBudget({
        ...data,
        fiscalYear: Number(data.fiscalYear),
        allocatedAmount: Number(data.allocatedAmount),
        committedAmount: 0,
        spentAmount: 0,
        availableAmount: Number(data.allocatedAmount),
        budgetCode: `BUD-${data.department.toUpperCase()}-${data.fiscalYear}`,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Budget allocation established');
      onClose();
    } catch {
      toast.error('Failed to allocate budget');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Allocate Budget Line">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
          <Input label="Cost Center Code *" {...register('costCenter')} error={errors.costCenter?.message} placeholder="e.g. CC-IT-001" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Linked Program" {...register('program')} placeholder="e.g. Digital Transformation" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Capital">Capital Expenditure (CAPEX)</option>
              <option value="Operations">Operational Expenditure (OPEX)</option>
              <option value="Training">Training Allocation</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Fiscal Year *" type="number" {...register('fiscalYear')} error={errors.fiscalYear?.message} placeholder="e.g. 2026" />
          <Input label="Allocated Funds (RWF) *" type="number" {...register('allocatedAmount')} error={errors.allocatedAmount?.message} placeholder="e.g. 450000000" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Allocate Budget</Button>
        </div>
      </form>
    </Modal>
  );
}
