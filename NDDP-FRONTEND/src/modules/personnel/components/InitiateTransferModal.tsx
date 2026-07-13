import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useInitiateTransferMutation, useGetPersonnelQuery } from '../api/personnel.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelId: z.string().min(1, 'Please select personnel'),
  newDepartment: z.string().min(2, 'New department is required'),
  newUnit: z.string().min(2, 'New unit is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  effectiveDate: z.string().min(1, 'Effective date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function InitiateTransferModal({ isOpen, onClose }: Props) {
  const [initiateTransfer, { isLoading }] = useInitiateTransferMutation();
  const { data } = useGetPersonnelQuery({ page: 1, limit: 100 });
  const personnelList = data?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedPerson = personnelList.find((p) => p.id === data.personnelId);
      await initiateTransfer({
        ...data,
        personnelName: selectedPerson ? `${selectedPerson.firstName} ${selectedPerson.lastName}` : '—',
      }).unwrap();
      toast.success('Transfer initiated successfully');
      onClose();
    } catch {
      toast.error('Failed to initiate transfer');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate Transfer">
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
        <Input label="New Department *" {...register('newDepartment')} error={errors.newDepartment?.message} placeholder="e.g. Logistics" />
        <Input label="New Unit *" {...register('newUnit')} error={errors.newUnit?.message} placeholder="e.g. Logistics Battalion" />
        <Input label="Effective Date *" type="date" {...register('effectiveDate')} error={errors.effectiveDate?.message} />
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
          <Button type="submit" isLoading={isLoading}>Initiate Transfer</Button>
        </div>
      </form>
    </Modal>
  );
}
