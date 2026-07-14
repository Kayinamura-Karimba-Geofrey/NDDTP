import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateMaintenancePartMutation } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  sku: z.string().min(3, 'SKU reference code is required'),
  name: z.string().min(2, 'Part name is required'),
  stock: z.string().min(1, 'Initial stock is required'),
  reorderLevel: z.string().min(1, 'Reorder level triggers is required'),
  unitCost: z.string().min(1, 'Unit cost value is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMaintenancePartModal({ isOpen, onClose }: Props) {
  const [createPart, { isLoading }] = useCreateMaintenancePartMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPart({
        ...data,
        stock: Number(data.stock),
        reorderLevel: Number(data.reorderLevel),
        unitCost: `RWF ${Number(data.unitCost).toLocaleString()}`,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Maintenance part registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register part');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Spare Part">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="SKU Code *" {...register('sku')} error={errors.sku?.message} placeholder="e.g. PIPE-40PVC" />
          <Input label="Part Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. PVC Pipe 40mm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Initial Stock *" type="number" {...register('stock')} error={errors.stock?.message} placeholder="e.g. 50" />
          <Input label="Reorder Level *" type="number" {...register('reorderLevel')} error={errors.reorderLevel?.message} placeholder="e.g. 10" />
          <Input label="Unit Cost (RWF) *" type="number" {...register('unitCost')} error={errors.unitCost?.message} placeholder="e.g. 3500" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Part</Button>
        </div>
      </form>
    </Modal>
  );
}
