import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateUnitMutation } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Unit name is required'),
  code: z.string().min(2, 'Unit code is required'),
  department: z.string().min(2, 'Department is required'),
  head: z.string().min(2, 'Unit head name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUnitModal({ isOpen, onClose }: Props) {
  const [createUnit, { isLoading }] = useCreateUnitMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createUnit(data).unwrap();
      toast.success('Unit created successfully');
      onClose();
    } catch {
      toast.error('Failed to create unit');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Unit">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Unit Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. HR Corps Division" />
        <Input label="Unit Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. RDF-HR-CORPS" />
        <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Human Resources" />
        <Input label="Unit Head / Commander *" {...register('head')} error={errors.head?.message} placeholder="e.g. Col. Mukamana" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Unit</Button>
        </div>
      </form>
    </Modal>
  );
}
