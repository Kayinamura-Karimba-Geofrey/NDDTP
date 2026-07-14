import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateCostCenterMutation } from '../api/finance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  code: z.string().min(3, 'Cost center code is required'),
  name: z.string().min(2, 'Cost center name is required'),
  department: z.string().min(2, 'Department is required'),
  manager: z.string().min(2, 'Manager name is required'),
  budget: z.string().min(1, 'Initial budget is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCostCenterModal({ isOpen, onClose }: Props) {
  const [createCostCenter, { isLoading }] = useCreateCostCenterMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createCostCenter({
        ...data,
        budget: Number(data.budget),
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Cost center established');
      onClose();
    } catch {
      toast.error('Failed to establish cost center');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish Cost Center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Cost Center Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. CC-IT-001" />
          <Input label="Cost Center Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. IT Operations" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
          <Input label="Account Manager *" {...register('manager')} error={errors.manager?.message} placeholder="e.g. Alice Uwase" />
        </div>
        <Input label="Assigned Budget (RWF) *" type="number" {...register('budget')} error={errors.budget?.message} placeholder="e.g. 450000000" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Establish Account</Button>
        </div>
      </form>
    </Modal>
  );
}
