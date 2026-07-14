import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateTechnicianMutation } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Technician name is required'),
  specialty: z.string().min(2, 'Specialty/Trade is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTechnicianModal({ isOpen, onClose }: Props) {
  const [createTech, { isLoading }] = useCreateTechnicianMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createTech({
        ...data,
        openOrders: 0,
        completedThisMonth: 0,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Technician registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register technician');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Technician">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Technician Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Eric Habimana" />
        <Input label="Specialty / Trade *" {...register('specialty')} error={errors.specialty?.message} placeholder="e.g. Electrical / Generators" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Technician</Button>
        </div>
      </form>
    </Modal>
  );
}
