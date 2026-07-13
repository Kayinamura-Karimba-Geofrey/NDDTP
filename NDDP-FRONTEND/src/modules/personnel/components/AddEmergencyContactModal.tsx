import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAddEmergencyContactMutation, useGetPersonnelQuery } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelId: z.string().min(1, 'Please select personnel'),
  name: z.string().min(2, 'Name is required'),
  relationship: z.string().min(2, 'Relationship is required'),
  phone: z.string().min(8, 'Phone number is required'),
  address: z.string().min(2, 'Address is required'),
  priority: z.string().min(1, 'Priority is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEmergencyContactModal({ isOpen, onClose }: Props) {
  const [addContact, { isLoading }] = useAddEmergencyContactMutation();
  const { data } = useGetPersonnelQuery({ page: 1, limit: 100 });
  const personnelList = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await addContact({ ...data, priority: Number(data.priority) }).unwrap();
      toast.success('Emergency contact added successfully');
      onClose();
    } catch {
      toast.error('Failed to add emergency contact');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Emergency Contact">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Personnel *</label>
          <select {...register('personnelId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {personnelList.map((p) => (
              <option key={p.id} value={p.id}>{p.serviceNumber} — {p.firstName} {p.lastName}</option>
            ))}
          </select>
          {errors.personnelId && <p className="text-sm text-destructive">{errors.personnelId.message}</p>}
        </div>
        <Input label="Contact Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Marie Habimana" />
        <Input label="Relationship *" {...register('relationship')} error={errors.relationship?.message} placeholder="e.g. Spouse" />
        <Input label="Phone Number *" {...register('phone')} error={errors.phone?.message} placeholder="e.g. +250 788 123 456" />
        <Input label="Address *" {...register('address')} error={errors.address?.message} placeholder="e.g. Kigali, Gasabo" />
        <Input label="Priority (e.g. 1, 2) *" type="number" {...register('priority')} error={errors.priority?.message} />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Contact</Button>
        </div>
      </form>
    </Modal>
  );
}
