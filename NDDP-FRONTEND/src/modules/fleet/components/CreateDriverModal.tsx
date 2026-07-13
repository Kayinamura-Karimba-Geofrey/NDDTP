import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateDriverMutation } from '../api/fleet.api';
import toast from 'react-hot-toast';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  personnelNumber: z.string().min(3, 'Personnel number is required'),
  department: z.string().min(2, 'Department is required'),
  licenseClass: z.string().min(1, 'License class is required'),
  licenseExpiry: z.string().min(1, 'License expiry is required'),
  experience: z.string().min(1, 'Experience duration is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDriverModal({ isOpen, onClose }: Props) {
  const [createDriver, { isLoading }] = useCreateDriverMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createDriver({
        ...data,
        driverNumber: `DRV-${Math.floor(100 + Math.random() * 900)}`,
        status: 'ACTIVE',
        medicalClearance: 'Fit',
      }).unwrap();
      toast.success('Driver registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register driver');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Driver">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name *" {...register('fullName')} error={errors.fullName?.message} placeholder="e.g. Grace Uwase" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Personnel ID *" {...register('personnelNumber')} error={errors.personnelNumber?.message} placeholder="e.g. PER-1301" />
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. HQ" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="License Class *" {...register('licenseClass')} error={errors.licenseClass?.message} placeholder="e.g. B, C" />
          <Input label="License Expiry *" type="date" {...register('licenseExpiry')} error={errors.licenseExpiry?.message} />
          <Input label="Experience (Years) *" {...register('experience')} error={errors.experience?.message} placeholder="e.g. 5 years" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Driver</Button>
        </div>
      </form>
    </Modal>
  );
}
