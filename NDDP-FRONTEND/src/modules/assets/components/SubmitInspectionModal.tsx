import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useSubmitInspectionMutation, useGetAssetsQuery } from '../api/asset.api';
import toast from 'react-hot-toast';

const schema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  inspectionDate: z.string().min(1, 'Inspection date is required'),
  inspector: z.string().min(2, 'Inspector name is required'),
  condition: z.string().min(2, 'Condition details are required'),
  compliance: z.string().min(2, 'Compliance status is required'),
  status: z.enum(['PASS', 'FAIL']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitInspectionModal({ isOpen, onClose }: Props) {
  const [submitInspection, { isLoading }] = useSubmitInspectionMutation();
  const { data } = useGetAssetsQuery({ page: 1, limit: 100 });
  const assets = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedAsset = assets.find((a) => a.id === data.assetId);
      await submitInspection({
        ...data,
        assetNumber: selectedAsset?.assetNumber ?? '—',
        assetName: selectedAsset?.name ?? '—',
      }).unwrap();
      toast.success('Inspection report submitted');
      onClose();
    } catch {
      toast.error('Failed to submit inspection report');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Inspection Report">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Asset *</label>
          <select {...register('assetId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>{a.assetNumber} — {a.name}</option>
            ))}
          </select>
          {errors.assetId && <p className="text-sm text-destructive">{errors.assetId.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Inspector *" {...register('inspector')} error={errors.inspector?.message} placeholder="e.g. Jean Mukamana" />
          <Input label="Inspection Date *" type="date" {...register('inspectionDate')} error={errors.inspectionDate?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Condition *" {...register('condition')} error={errors.condition?.message} placeholder="e.g. Good / Operational" />
          <Input label="Compliance *" {...register('compliance')} error={errors.compliance?.message} placeholder="e.g. Compliant" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Outcome *</label>
          <select {...register('status')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Inspection</Button>
        </div>
      </form>
    </Modal>
  );
}
