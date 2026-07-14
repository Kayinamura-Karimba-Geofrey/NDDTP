import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateWorkOrderMutation, useGetMaintenanceTechniciansQuery } from '../api/maintenance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE', 'EMERGENCY', 'INSPECTION']),
  asset: z.string().min(2, 'Asset is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  technicianId: z.string().min(1, 'Please assign a technician'),
  scheduledAt: z.string().min(1, 'Scheduled start date is required'),
  dueAt: z.string().min(1, 'Due date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkOrderModal({ isOpen, onClose }: Props) {
  const [createWO, { isLoading }] = useCreateWorkOrderMutation();
  const { data: technicians = [] } = useGetMaintenanceTechniciansQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedTech = technicians.find((t) => t.id === data.technicianId);
      await createWO({
        ...data,
        assignee: selectedTech?.name ?? 'Unassigned',
        status: 'SCHEDULED',
        progress: 0,
      }).unwrap();
      toast.success('Work order scheduled successfully');
      onClose();
    } catch {
      toast.error('Failed to create work order');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Work Order">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Work Order Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. Boardroom AC Corrective" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Maintenance Type *</label>
            <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="CORRECTIVE">Corrective (Repair)</option>
              <option value="PREVENTIVE">Preventive (Routine check)</option>
              <option value="EMERGENCY">Emergency (Immediate danger)</option>
              <option value="INSPECTION">Inspection/Audit</option>
            </select>
          </div>
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
        <div className="grid grid-cols-2 gap-4">
          <Input label="Asset Reference Code *" {...register('asset')} error={errors.asset?.message} placeholder="e.g. HVAC-HQ-04" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Assign Technician *</label>
            <select {...register('technicianId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({t.specialty})</option>
              ))}
            </select>
            {errors.technicianId && <p className="text-sm text-destructive">{errors.technicianId.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Scheduled Start Date *" type="date" {...register('scheduledAt')} error={errors.scheduledAt?.message} />
          <Input label="Due Date *" type="date" {...register('dueAt')} error={errors.dueAt?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Work Order</Button>
        </div>
      </form>
    </Modal>
  );
}
