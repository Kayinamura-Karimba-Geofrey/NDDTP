import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateSupplierMutation } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Supplier name is required'),
  category: z.string().min(1, 'Category is required'),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSupplierModal({ isOpen, onClose }: Props) {
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createSupplier({
        ...data,
        code: `SUP-${Math.floor(100 + Math.random() * 900)}`,
        status: 'ACTIVE',
        rating: 5.0,
      }).unwrap();
      toast.success('Supplier registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register supplier');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Supplier">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Supplier Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Toyota Rwanda" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Category *</label>
          <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="IT Equipment">IT Equipment</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Construction">Construction</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Reg Number" {...register('registrationNumber')} placeholder="e.g. RC-2026-1122" />
          <Input label="Tax ID / TIN" {...register('taxId')} placeholder="e.g. TIN-987654" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Contact Email" {...register('email')} error={errors.email?.message} placeholder="e.g. sales@toyota.rw" />
          <Input label="Contact Phone" {...register('phone')} placeholder="e.g. +250 788 111 222" />
        </div>
        <Input label="Address" {...register('address')} placeholder="e.g. Kigali, Rwanda" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Supplier</Button>
        </div>
      </form>
    </Modal>
  );
}
