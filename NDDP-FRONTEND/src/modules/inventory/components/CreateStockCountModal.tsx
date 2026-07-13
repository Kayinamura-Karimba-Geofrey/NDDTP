import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateStockCountMutation, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  warehouse: z.string().min(1, 'Warehouse is required'),
  countType: z.enum(['Cycle Count', 'Full Count', 'Spot Check']),
  counter: z.string().min(2, 'Counter name is required'),
  countDate: z.string().min(1, 'Count date is required'),
  variance: z.string().min(1, 'Variance quantity is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStockCountModal({ isOpen, onClose }: Props) {
  const [createCount, { isLoading }] = useCreateStockCountMutation();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCount({
        ...data,
        variance: Number(data.variance),
        countNumber: `CNT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'COMPLETED',
      }).unwrap();
      toast.success('Stock count recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to record stock count');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Stock Count Audit">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Warehouse *</label>
          <select {...register('warehouse')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
          {errors.warehouse && <p className="text-sm text-destructive">{errors.warehouse.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Count Type *</label>
          <select {...register('countType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="Cycle Count">Cycle Count (Routine / Sectional)</option>
            <option value="Full Count">Full Count (Annual / Comprehensive)</option>
            <option value="Spot Check">Spot Check (Ad-hoc Verification)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Counter Name *" {...register('counter')} error={errors.counter?.message} placeholder="e.g. Jean Mukamana" />
          <Input label="Count Date *" type="date" {...register('countDate')} error={errors.countDate?.message} />
        </div>
        <Input label="Discovered Variance Quantity *" type="number" {...register('variance')} error={errors.variance?.message} placeholder="e.g. -12 or 0" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Count</Button>
        </div>
      </form>
    </Modal>
  );
}
