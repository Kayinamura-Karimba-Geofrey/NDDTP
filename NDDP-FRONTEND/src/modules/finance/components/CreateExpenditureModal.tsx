import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateExpenditureMutation, useGetBudgetsQuery } from '../api/finance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(2, 'Department is required'),
  category: z.string().min(2, 'Category of expenditure is required'),
  supplier: z.string().optional(),
  amount: z.string().min(1, 'Amount is required'),
  budgetCode: z.string().min(1, 'Please link to a budget code'),
  purpose: z.string().min(5, 'Purpose must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateExpenditureModal({ isOpen, onClose }: Props) {
  const [createExp, { isLoading }] = useCreateExpenditureMutation();
  const { data } = useGetBudgetsQuery({ page: 1, limit: 100 });
  const budgets = data?.data ?? [];
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createExp({
        ...data,
        amount: Number(data.amount),
        budget: data.budgetCode,
        expenditureNumber: `EXP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'PENDING',
        status: 'PENDING',
      }).unwrap();
      toast.success('Expenditure transaction recorded');
      onClose();
    } catch {
      toast.error('Failed to log expenditure');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Expenditure">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Medical" />
          <Input label="Category *" {...register('category')} error={errors.category?.message} placeholder="e.g. Medical Supplies" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Supplier / Payee" {...register('supplier')} placeholder="e.g. MedEquip Rwanda" />
          <Input label="Cost (RWF) *" type="number" {...register('amount')} error={errors.amount?.message} placeholder="e.g. 45000000" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Link Budget Line *</label>
          <select {...register('budgetCode')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {budgets.map((b) => (
              <option key={b.id} value={b.budgetCode}>{b.budgetCode} — {b.department} (Avail: {(b.availableAmount / 1e6).toFixed(1)}M RWF)</option>
            ))}
          </select>
          {errors.budgetCode && <p className="text-sm text-destructive">{errors.budgetCode.message}</p>}
        </div>
        <Input label="Purpose of Expense *" {...register('purpose')} error={errors.purpose?.message} placeholder="e.g. Clinical consumables Q3" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Log Expense</Button>
        </div>
      </form>
    </Modal>
  );
}
