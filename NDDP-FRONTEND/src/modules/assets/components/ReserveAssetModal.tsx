import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useReserveAssetMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  requester: z.string().min(2, 'Requester name is required'),
  reservationDate: z.string().min(1, 'Reservation date is required'),
  returnDate: z.string().min(1, 'Return date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ReserveAssetModal({ isOpen, onClose }: Props) {
  const [reserveAsset, { isLoading }] = useReserveAssetMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await reserveAsset({
        ...data,
        assetName: selectedAsset?.name ?? '—',
      }).unwrap();
      toast.success('Asset reservation request created');
      onClose();
    } catch {
      toast.error('Failed to reserve asset');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Asset">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.filter((a) => a.status === 'AVAILABLE').map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name}</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <Input label="Requester Name *" {...register('requester')} error={errors.requester?.message} placeholder="e.g. Patrick Habimana" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Reservation Start *" type="date" {...register('reservationDate')} error={errors.reservationDate?.message} />
          <Input label="Reservation End *" type="date" {...register('returnDate')} error={errors.returnDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Reserve Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
