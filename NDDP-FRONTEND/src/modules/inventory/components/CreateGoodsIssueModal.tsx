import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateGoodsIssueMutation, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(2, 'Department name is required'),
  requester: z.string().min(2, 'Requester name is required'),
  warehouse: z.string().min(1, 'Warehouse is required'),
  items: z.string().min(1, 'Item count is required'),
  quantity: z.string().min(1, 'Total quantity is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGoodsIssueModal({ isOpen, onClose }: Props) {
  const [createIssue, { isLoading }] = useCreateGoodsIssueMutation();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createIssue({
        ...data,
        items: Number(data.items),
        quantity: Number(data.quantity),
        issueNumber: `GIN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'COMPLETED',
      }).unwrap();
      toast.success('Goods issue recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to record goods issue');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Goods Issue">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Source Warehouse *</label>
          <select {...register('warehouse')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
          {errors.warehouse && <p className="text-sm text-destructive">{errors.warehouse.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Requester *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. Alice Uwase" />
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distinct Items Count *" type="number" {...register('items')} error={errors.items?.message} placeholder="e.g. 2" />
          <Input label="Total Quantities Issued *" type="number" {...register('quantity')} error={errors.quantity?.message} placeholder="e.g. 30" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Issue *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Reason..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Issue</Button>
        </div>
      </form>
    </Modal>
  );
}
