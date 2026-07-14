import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateVisitorMutation } from '../api/visitor.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  organization: z.string().min(2, 'Organization / Company is required'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  idType: z.enum(['NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE', 'MILITARY_ID', 'OTHER']),
  idNumber: z.string().min(3, 'ID document number is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVisitorModal({ isOpen, onClose }: Props) {
  const [createVisitor, { isLoading }] = useCreateVisitorMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createVisitor({
        ...data,
        visits: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Visitor profile created successfully');
      onClose();
    } catch {
      toast.error('Failed to create visitor profile');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Visitor Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Visitor Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Paul Kagabo" />
          <Input label="Organization / Company *" {...register('organization')} error={errors.organization?.message} placeholder="e.g. Rwanda Utilities" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone Number *" {...register('phone')} error={errors.phone?.message} placeholder="e.g. +250788***211" />
          <Input label="Email Address *" {...register('email')} error={errors.email?.message} placeholder="e.g. p.kagabo@example.rw" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Identity Document Type *</label>
            <select {...register('idType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="NATIONAL_ID">National Identity Card</option>
              <option value="PASSPORT">Passport</option>
              <option value="DRIVERS_LICENSE">Driver's License</option>
              <option value="MILITARY_ID">Military ID Card</option>
              <option value="OTHER">Other / Gate Pass</option>
            </select>
          </div>
          <Input label="ID Document Number *" {...register('idNumber')} error={errors.idNumber?.message} placeholder="e.g. 1198*****01" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Profile</Button>
        </div>
      </form>
    </Modal>
  );
}
