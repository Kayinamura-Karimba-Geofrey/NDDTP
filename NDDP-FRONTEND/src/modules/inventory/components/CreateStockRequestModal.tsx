import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateStockRequestMutation } from '../api/inventory.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(2, 'Department name is required'),
  requester: z.string().min(2, 'Requester name is required'),
  priority: z.enum(['Normal', 'High', 'Urgent']),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStockRequestModal({ isOpen, onClose }: Props) {
  const [createRequest, { isLoading }] = useCreateStockRequestMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createRequest({
        ...data,
        requestNumber: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'PENDING',
      }).unwrap();
      toast.success('Stock request created successfully');
      onClose();
    } catch {
      toast.error('Failed to create stock request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Stock Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Requester *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. Grace Ingabire" />
          <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Finance" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Priority *</label>
          <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Items Requested & Quantities *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="e.g. 5 Reams of A4 Copy Paper, 2 USB-C Cables..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
}
