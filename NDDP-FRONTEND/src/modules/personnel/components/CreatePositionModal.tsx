import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePositionMutation } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Position name is required'),
  code: z.string().min(2, 'Position code is required'),
  department: z.string().min(2, 'Department is required'),
  reportsTo: z.string().min(2, 'Reporting manager/commander is required'),
  grade: z.string().min(1, 'Grade is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePositionModal({ isOpen, onClose }: Props) {
  const [createPosition, { isLoading }] = useCreatePositionMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPosition(data).unwrap();
      toast.success('Position created successfully');
      onClose();
    } catch {
      toast.error('Failed to create position');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Position">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Position / Job Title *" {...register('name')} error={errors.name?.message} placeholder="e.g. HR Analyst" />
        <Input label="Position Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. POS-HR-ANL" />
        <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Human Resources" />
        <Input label="Reports To *" {...register('reportsTo')} error={errors.reportsTo?.message} placeholder="e.g. Major Habimana" />
        <Input label="Salary Grade / Rank *" {...register('grade')} error={errors.grade?.message} placeholder="e.g. O2" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Add Position</Button>
        </div>
      </form>
    </Modal>
  );
}
