import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateMaintenanceRequestMutation, useGetMaintenanceCategoriesQuery } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  categoryId: z.string().min(1, 'Category is required'),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE', 'EMERGENCY', 'INSPECTION']),
  asset: z.string().min(2, 'Asset Code / Reference is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  requestedBy: z.string().min(2, 'Requester name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMaintenanceRequestModal({ isOpen, onClose }: Props) {
  const [createRequest, { isLoading }] = useCreateMaintenanceRequestMutation();
  const { data: categories = [] } = useGetMaintenanceCategoriesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedCategory = categories.find((c) => c.id === data.categoryId);
      await createRequest({
        ...data,
        category: selectedCategory?.name ?? 'Other',
        requestedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'PENDING',
      }).unwrap();
      toast.success('Maintenance request ticket created');
      onClose();
    } catch {
      toast.error('Failed to submit request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Maintenance Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Issue Summary / Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. AC Unit Failure — Boardroom" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Category *</label>
            <select {...register('categoryId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Maintenance Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="CORRECTIVE">Corrective (Repair)</option>
              <option value="PREVENTIVE">Preventive (Routine check)</option>
              <option value="EMERGENCY">Emergency (Immediate danger)</option>
              <option value="INSPECTION">Inspection/Audit</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Asset Code / Ref *" {...register('asset')} error={errors.asset?.message} placeholder="e.g. HVAC-HQ-04" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority *</label>
            <select {...register('priority')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>
        <Input label="Requested By *" {...register('requestedBy')} error={errors.requestedBy?.message} placeholder="e.g. Facilities Desk" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
}
