import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateContractMutation, useGetSuppliersQuery } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  supplier: z.string().min(1, 'Supplier is required'),
  contractType: z.string().min(2, 'Contract type is required'),
  value: z.string().min(1, 'Contract value is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  renewalDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateContractModal({ isOpen, onClose }: Props) {
  const [createContract, { isLoading }] = useCreateContractMutation();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createContract({
        ...data,
        value: Number(data.value),
        contractNumber: `CNT-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Contract registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register contract');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Contract Agreement">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Supplier *</label>
          <select {...register('supplier')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.supplier && <p className="text-sm text-destructive">{errors.supplier.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Contract Type *" {...register('contractType')} error={errors.contractType?.message} placeholder="e.g. Supply / Construction" />
          <Input label="Contract Value (RWF) *" type="number" {...register('value')} error={errors.value?.message} placeholder="e.g. 280000000" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Start Date *" type="date" {...register('startDate')} error={errors.startDate?.message} />
          <Input label="End Date *" type="date" {...register('endDate')} error={errors.endDate?.message} />
          <Input label="Renewal Review" type="date" {...register('renewalDate')} error={errors.renewalDate?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Register Contract</Button>
        </div>
      </form>
    </Modal>
  );
}
