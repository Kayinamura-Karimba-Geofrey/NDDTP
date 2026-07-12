import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateLeaveTypeMutation } from '../api/leave.api';
import toast from 'react-hot-toast';

const leaveTypeSchema = z.object({
  code: z.string().min(2, 'Code is required'),
  name: z.string().min(2, 'Name is required'),
  maxDays: z.number().min(0, 'Max days must be 0 or more'),
  accrualType: z.string().min(1, 'Accrual type is required'),
});

type LeaveTypeFormValues = z.infer<typeof leaveTypeSchema>;

interface CreateLeaveTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateLeaveTypeModal({ isOpen, onClose }: CreateLeaveTypeModalProps) {
  const [createLeaveType, { isLoading }] = useCreateLeaveTypeMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: { code: '', name: '', maxDays: 0, accrualType: 'YEARLY' },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: LeaveTypeFormValues) => {
    try {
      await createLeaveType(data).unwrap();
      toast.success('Leave type created successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to create leave type');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Leave Type">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Code" {...register('code')} error={errors.code?.message} placeholder="e.g. AL" />
          <Input label="Name" {...register('name')} error={errors.name?.message} placeholder="e.g. Annual Leave" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Default Days" type="number" {...register('maxDays', { valueAsNumber: true })} error={errors.maxDays?.message} />
          <label className="text-sm"><span className="font-medium">Accrual Type</span>
            <select {...register('accrualType')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="YEARLY">Yearly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="NONE">None (Granted as needed)</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Leave Type'}</Button>
        </div>
      </form>
    </Modal>
  );
}
