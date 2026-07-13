import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateGoodsReceiptMutation, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  supplier: z.string().min(2, 'Supplier name is required'),
  warehouse: z.string().min(1, 'Warehouse is required'),
  receiptDate: z.string().min(1, 'Receipt date is required'),
  items: z.string().min(1, 'Item count is required'),
  quantity: z.string().min(1, 'Total quantity is required'),
  receiver: z.string().min(2, 'Receiver name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGoodsReceiptModal({ isOpen, onClose }: Props) {
  const [createReceipt, { isLoading }] = useCreateGoodsReceiptMutation();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createReceipt({
        ...data,
        items: Number(data.items),
        quantity: Number(data.quantity),
        receiptNumber: `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'COMPLETED',
      }).unwrap();
      toast.success('Goods receipt recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to record goods receipt');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Goods Receipt">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Supplier *" {...register('supplier')} error={errors.supplier?.message} placeholder="e.g. MedEquip Rwanda" />
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
          <Input label="Receipt Date *" type="date" {...register('receiptDate')} error={errors.receiptDate?.message} />
          <Input label="Receiver Name *" {...register('receiver')} error={errors.receiver?.message} placeholder="e.g. Jean Mukamana" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distinct Items Count *" type="number" {...register('items')} error={errors.items?.message} placeholder="e.g. 5" />
          <Input label="Total Quantities Received *" type="number" {...register('quantity')} error={errors.quantity?.message} placeholder="e.g. 500" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Receipt</Button>
        </div>
      </form>
    </Modal>
  );
}
