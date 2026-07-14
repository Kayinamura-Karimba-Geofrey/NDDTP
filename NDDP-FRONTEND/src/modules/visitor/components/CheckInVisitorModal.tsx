import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useRecordCheckInMutation, useGetVisitRequestsQuery } from '../api/visitor.api';
import toast from 'react-hot-toast';

const schema = z.object({
  visitId: z.string().min(1, 'Please select an authorized visit'),
  badge: z.string().min(2, 'Badge reference number is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckInVisitorModal({ isOpen, onClose }: Props) {
  const [recordCheckIn, { isLoading }] = useRecordCheckInMutation();
  const { data: visits = [] } = useGetVisitRequestsQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVisit = visits.find((v) => v.id === data.visitId);
      await recordCheckIn({
        ...data,
        visitor: selectedVisit?.visitor ?? '—',
        site: selectedVisit?.site ?? '—',
        type: 'CHECK_IN',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        officer: 'Duty Officer',
      }).unwrap();
      toast.success('Visitor checked in successfully');
      onClose();
    } catch {
      toast.error('Failed to record check-in');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Check-In Visitor">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Approved Visit *</label>
          <select {...register('visitId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {visits.filter((v) => v.status === 'APPROVED').map((v) => (
              <option key={v.id} value={v.id}>{v.visitor} — Host: {v.host} ({v.site})</option>
            ))}
          </select>
          {errors.visitId && <p className="text-sm text-destructive">{errors.visitId.message}</p>}
        </div>
        <Input label="Assign Badge Number *" {...register('badge')} error={errors.badge?.message} placeholder="e.g. BDG-7841" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Confirm Check-In</Button>
        </div>
      </form>
    </Modal>
  );
}
