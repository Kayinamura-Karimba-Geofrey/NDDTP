import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useInitiatePromotionMutation, useGetPersonnelQuery } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelId: z.string().min(1, 'Please select personnel'),
  newPosition: z.string().min(2, 'New Position is required'),
  newRank: z.string().optional(),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function InitiatePromotionModal({ isOpen, onClose }: Props) {
  const [initiatePromotion, { isLoading }] = useInitiatePromotionMutation();
  const { data } = useGetPersonnelQuery({ page: 1, limit: 100 });
  const personnelList = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedPerson = personnelList.find((p) => p.id === data.personnelId);
      await initiatePromotion({
        ...data,
        personnelName: selectedPerson ? `${selectedPerson.firstName} ${selectedPerson.lastName}` : '—',
        oldPosition: selectedPerson?.position ?? '—',
        oldRank: selectedPerson?.rank ?? '—',
      }).unwrap();
      toast.success('Promotion initiated successfully');
      onClose();
    } catch {
      toast.error('Failed to initiate promotion');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate Promotion">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Personnel *</label>
          <select {...register('personnelId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {personnelList.map((p) => (
              <option key={p.id} value={p.id}>{p.serviceNumber} — {p.firstName} {p.lastName}</option>
            ))}
          </select>
          {errors.personnelId && <p className="text-sm text-destructive">{errors.personnelId.message}</p>}
        </div>
        <Input label="New Position / Job Title *" {...register('newPosition')} error={errors.newPosition?.message} placeholder="e.g. HR Manager" />
        <Input label="New Rank (Optional)" {...register('newRank')} error={errors.newRank?.message} placeholder="e.g. Lieutenant Colonel" />
        <Input label="Effective Date *" type="date" {...register('effectiveDate')} error={errors.effectiveDate?.message} />
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason / Criteria *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Reason..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Initiate Promotion</Button>
        </div>
      </form>
    </Modal>
  );
}
