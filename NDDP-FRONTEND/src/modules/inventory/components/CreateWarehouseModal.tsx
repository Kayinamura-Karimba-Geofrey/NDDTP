import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateWarehouseMutation } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Warehouse name is required'),
  code: z.string().min(2, 'Warehouse code is required'),
  location: z.string().min(2, 'Location is required'),
  manager: z.string().optional(),
  capacity: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWarehouseModal({ isOpen, onClose }: Props) {
  const [createWarehouse, { isLoading }] = useCreateWarehouseMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createWarehouse(data).unwrap();
      toast.success('Warehouse created successfully');
      onClose();
    } catch {
      toast.error('Failed to create warehouse');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Warehouse">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Warehouse Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. IT Consumables Store" />
        <Input label="Warehouse Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. WH-IT" />
        <Input label="Location *" {...register('location')} error={errors.location?.message} placeholder="e.g. Kigali HQ — IT Wing" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Manager / Supervisor" {...register('manager')} placeholder="e.g. Alice Uwase" />
          <Input label="Storage Capacity" {...register('capacity')} placeholder="e.g. 800 m²" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Warehouse</Button>
        </div>
      </form>
    </Modal>
  );
}
