import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateInventoryItemMutation, useGetInventoryCategoriesQuery, useGetWarehousesQuery } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  unit: z.string().min(1, 'Unit of measure is required'),
  reorderLevel: z.string().min(1, 'Reorder level is required'),
  warehouse: z.string().min(1, 'Warehouse is required'),
  barcode: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateInventoryItemModal({ isOpen, onClose }: Props) {
  const [createItem, { isLoading }] = useCreateInventoryItemMutation();
  const { data: categories = [] } = useGetInventoryCategoriesQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createItem({
        ...data,
        reorderLevel: Number(data.reorderLevel),
      }).unwrap();
      toast.success('Item added successfully');
      onClose();
    } catch {
      toast.error('Failed to add item');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Inventory Item">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Item Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Combat Uniform Set" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <Input label="Unit of Measure *" {...register('unit')} error={errors.unit?.message} placeholder="e.g. Set / Piece / Box" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Reorder Level *" type="number" {...register('reorderLevel')} error={errors.reorderLevel?.message} placeholder="e.g. 50" />
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
        </div>
        <Input label="Barcode (Optional)" {...register('barcode')} placeholder="e.g. 8901234567890" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Item</Button>
        </div>
      </form>
    </Modal>
  );
}
