import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateWarehouseTransferMutation, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  sourceWarehouse: z.string().min(1, 'Source warehouse is required'),
  destinationWarehouse: z.string().min(1, 'Destination warehouse is required'),
  items: z.string().min(1, 'Item count is required'),
  transferDate: z.string().min(1, 'Transfer date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWarehouseTransferModal({ isOpen, onClose }: Props) {
  const [createTransfer, { isLoading }] = useCreateWarehouseTransferMutation();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.sourceWarehouse === data.destinationWarehouse) {
        toast.error('Source and Destination warehouses cannot be the same');
        return;
      }
      await createTransfer({
        ...data,
        items: Number(data.items),
        transferNumber: `WT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'IN_TRANSIT',
      }).unwrap();
      toast.success('Warehouse transfer initiated');
      onClose();
    } catch {
      toast.error('Failed to initiate warehouse transfer');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Warehouse Transfer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Source Warehouse *</label>
          <select {...register('sourceWarehouse')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
          {errors.sourceWarehouse && <p className="text-sm text-destructive">{errors.sourceWarehouse.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Destination Warehouse *</label>
          <select {...register('destinationWarehouse')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
          {errors.destinationWarehouse && <p className="text-sm text-destructive">{errors.destinationWarehouse.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distinct Items Count *" type="number" {...register('items')} error={errors.items?.message} placeholder="e.g. 4" />
          <Input label="Transfer Date *" type="date" {...register('transferDate')} error={errors.transferDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Initiate Transfer</Button>
        </div>
      </form>
    </Modal>
  );
}
