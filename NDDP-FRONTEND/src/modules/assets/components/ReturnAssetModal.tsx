import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useReturnAssetMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  returnedDate: z.string().min(1, 'Return date is required'),
  condition: z.string().min(2, 'Condition details are required'),
  inspector: z.string().min(2, 'Inspector name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ReturnAssetModal({ isOpen, onClose }: Props) {
  const [returnAsset, { isLoading }] = useReturnAssetMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await returnAsset({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
        personnelName: selectedAsset?.assignedTo ?? '—',
      }).unwrap();
      toast.success('Asset return recorded');
      onClose();
    } catch {
      toast.error('Failed to return asset');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Return Asset">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Assigned Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.filter((a) => a.status === 'ASSIGNED').map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name} ({a.assignedTo})</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <Input label="Inspector Name *" {...register('inspector')} error={errors.inspector?.message} placeholder="e.g. Jean Mukamana" />
        <Input label="Return Date *" type="date" {...register('returnedDate')} error={errors.returnedDate?.message} />
        <Input label="Received Condition *" {...register('condition')} error={errors.condition?.message} placeholder="e.g. Fair — minor wear" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Return Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
