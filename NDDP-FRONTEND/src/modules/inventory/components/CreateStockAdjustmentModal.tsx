import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateStockAdjustmentMutation, useGetInventoryItemsQuery, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  itemId: z.string().min(1, 'Please select an item'),
  warehouse: z.string().min(1, 'Warehouse is required'),
  quantity: z.string().min(1, 'Quantity adjustment is required (positive or negative)'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  adjustedBy: z.string().min(2, 'Adjusted by name is required'),
  date: z.string().min(1, 'Adjustment date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStockAdjustmentModal({ isOpen, onClose }: Props) {
  const [createAdjustment, { isLoading }] = useCreateStockAdjustmentMutation();
  const { data } = useGetInventoryItemsQuery({ page: 1, limit: 100 });
  const items = data?.data ?? [];
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedItem = items.find((i) => i.id === data.itemId);
      await createAdjustment({
        ...data,
        itemName: selectedItem?.name ?? '—',
        quantity: Number(data.quantity),
        adjustmentNumber: `ADJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'COMPLETED',
      }).unwrap();
      toast.success('Stock adjustment recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to record stock adjustment');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Stock Adjustment">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Item *</label>
          <select {...register('itemId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {items.map((i) => (
              <option key={i.id} value={i.id}>{i.itemCode} — {i.name} ({i.currentStock} in stock)</option>
            ))}
          </select>
          {errors.itemId && <p className="text-sm text-destructive">{errors.itemId.message}</p>}
        </div>
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
        <div className="grid grid-cols-2 gap-4">
          <Input label="Quantity Adjustment (+ / -) *" type="number" {...register('quantity')} error={errors.quantity?.message} placeholder="e.g. -5 or 10" />
          <Input label="Adjusted By *" {...register('adjustedBy')} error={errors.adjustedBy?.message} placeholder="e.g. Jean Mukamana" />
        </div>
        <Input label="Adjustment Date *" type="date" {...register('date')} error={errors.date?.message} />
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Adjustment *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="e.g. Damage / Counting Error / Spillage..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Adjustment</Button>
        </div>
      </form>
    </Modal>
  );
}
