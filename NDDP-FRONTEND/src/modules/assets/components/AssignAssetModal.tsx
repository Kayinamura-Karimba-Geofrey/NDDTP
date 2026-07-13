import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useAssignAssetMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  personnelName: z.string().min(2, 'Assignee name is required'),
  department: z.string().min(2, 'Department is required'),
  assignmentDate: z.string().min(1, 'Assignment date is required'),
  expectedReturn: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AssignAssetModal({ isOpen, onClose }: Props) {
  const [assignAsset, { isLoading }] = useAssignAssetMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await assignAsset({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
      }).unwrap();
      toast.success('Asset assigned successfully');
      onClose();
    } catch {
      toast.error('Failed to assign asset');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Asset">
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
        <Input label="Assignee Name *" {...register('personnelName')} error={errors.personnelName?.message} placeholder="e.g. Alice Uwase" />
        <Input label="Department *" {...register('department')} error={errors.department?.message} placeholder="e.g. IT" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Assignment Date *" type="date" {...register('assignmentDate')} error={errors.assignmentDate?.message} />
          <Input label="Expected Return Date" type="date" {...register('expectedReturn')} error={errors.expectedReturn?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Assign Asset</Button>
        </div>
      </form>
    </Modal>
  );
}
