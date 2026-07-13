import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useDisposeAssetMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  method: z.string().min(2, 'Disposal method is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  disposalDate: z.string().min(1, 'Disposal date is required'),
  value: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function DisposeAssetModal({ isOpen, onClose }: Props) {
  const [disposeAsset, { isLoading }] = useDisposeAssetMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await disposeAsset({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
        value: data.value ? Number(data.value) : undefined,
      }).unwrap();
      toast.success('Asset disposal recorded');
      onClose();
    } catch {
      toast.error('Failed to record disposal');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dispose Asset">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.filter((a) => a.status !== 'DISPOSED').map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name} ({a.status})</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Disposal Method *" {...register('method')} error={errors.method?.message} placeholder="e.g. Salvaged / Sold / Recycled" />
          <Input label="Disposal Date *" type="date" {...register('disposalDate')} error={errors.disposalDate?.message} />
        </div>
        <Input label="Recovered Value (RWF)" type="number" {...register('value')} error={errors.value?.message} placeholder="e.g. 50000" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Disposal *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Reason..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Dispose Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
