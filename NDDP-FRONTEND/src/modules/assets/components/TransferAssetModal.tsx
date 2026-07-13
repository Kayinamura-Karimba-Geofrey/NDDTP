import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useTransferAssetMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  toOwner: z.string().min(2, 'Recipient owner name is required'),
  department: z.string().min(2, 'Department is required'),
  transferDate: z.string().min(1, 'Transfer date is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferAssetModal({ isOpen, onClose }: Props) {
  const [transferAsset, { isLoading }] = useTransferAssetMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await transferAsset({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
        fromOwner: selectedAsset?.assignedTo ?? 'Store',
      }).unwrap();
      toast.success('Asset transfer initiated');
      onClose();
    } catch {
      toast.error('Failed to transfer asset');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Asset">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.filter((a) => a.status === 'ASSIGNED').map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name} ({a.assignedTo})</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <Input label="Recipient Owner *" {...register('toOwner')} error={errors.toOwner?.message} placeholder="e.g. Fabrice Nkurunziza" />
        <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. Finance" />
        <Input label="Transfer Date *" type="date" {...register('transferDate')} error={errors.transferDate?.message} />
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Transfer *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Reason..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Transfer Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
