import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useRequestMaintenanceMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  technician: z.string().min(2, 'Technician/Workshop is required'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  type: z.string().min(2, 'Maintenance type is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestMaintenanceModal({ isOpen, onClose }: Props) {
  const [requestMnt, { isLoading }] = useRequestMaintenanceMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await requestMnt({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
        maintenanceNumber: `MNT-${Math.floor(1000 + Math.random() * 9000)}`,
      }).unwrap();
      toast.success('Maintenance ticket created');
      onClose();
    } catch {
      toast.error('Failed to request maintenance');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Maintenance">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name} ({a.status})</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Technician / Workshop *" {...register('technician')} error={errors.technician?.message} placeholder="e.g. IT Helpdesk" />
          <Input label="Scheduled Date *" type="date" {...register('scheduledDate')} error={errors.scheduledDate?.message} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Type *</label>
          <select {...register('type')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="Corrective">Corrective (Repair)</option>
            <option value="Preventive">Preventive (Routine Service)</option>
            <option value="Upgrade">Software/Hardware Upgrade</option>
          </select>
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Issue / Reason *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Describe the issue..."
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
