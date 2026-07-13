import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePurchaseOrderMutation, useGetSuppliersQuery } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  supplier: z.string().min(1, 'Supplier is required'),
  items: z.string().min(1, 'Item count is required'),
  totalAmount: z.string().min(1, 'Total amount is required'),
  deliveryDate: z.string().min(1, 'Expected delivery date is required'),
  deliveryAddress: z.string().min(2, 'Delivery address is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePurchaseOrderModal({ isOpen, onClose }: Props) {
  const [createPO, { isLoading }] = useCreatePurchaseOrderMutation();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPO({
        ...data,
        items: Number(data.items),
        totalAmount: Number(data.totalAmount),
        poNumber: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'APPROVED',
      }).unwrap();
      toast.success('Purchase order created successfully');
      onClose();
    } catch {
      toast.error('Failed to create purchase order');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Purchase Order">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Supplier *</label>
          <select {...register('supplier')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.supplier && <p className="text-sm text-destructive">{errors.supplier.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distinct Items Count *" type="number" {...register('items')} error={errors.items?.message} placeholder="e.g. 5" />
          <Input label="Total Cost (RWF) *" type="number" {...register('totalAmount')} error={errors.totalAmount?.message} placeholder="e.g. 12500000" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Delivery Date *" type="date" {...register('deliveryDate')} error={errors.deliveryDate?.message} />
          <Input label="Delivery Destination *" {...register('deliveryAddress')} error={errors.deliveryAddress?.message} placeholder="e.g. Kigali HQ" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Create Purchase Order</Button>
        </div>
      </form>
    </Modal>
  );
}
