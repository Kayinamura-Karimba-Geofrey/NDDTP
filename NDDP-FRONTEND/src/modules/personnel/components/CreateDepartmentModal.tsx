import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateDepartmentMutation } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Department name is required'),
  code: z.string().min(2, 'Department code is required'),
  manager: z.string().min(2, 'Manager name is required'),
  location: z.string().min(2, 'Location is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDepartmentModal({ isOpen, onClose }: Props) {
  const [createDept, { isLoading }] = useCreateDepartmentMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createDept(data).unwrap();
      toast.success('Department created successfully');
      onClose();
    } catch {
      toast.error('Failed to create department');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Department">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Department Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Finance Division" />
        <Input label="Department Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. FIN-DIV" />
        <Input label="Manager / Commander *" {...register('manager')} error={errors.manager?.message} placeholder="e.g. Maj. Habimana" />
        <Input label="Location *" {...register('location')} error={errors.location?.message} placeholder="e.g. Kigali HQ" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Department</Button>
        </div>
      </form>
    </Modal>
  );
}
