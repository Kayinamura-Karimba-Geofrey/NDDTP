import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useSubmitBidMutation, useGetTendersQuery, useGetSuppliersQuery } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  tenderNumber: z.string().min(1, 'Tender selection is required'),
  supplier: z.string().min(1, 'Supplier selection is required'),
  bidAmount: z.string().min(1, 'Bid amount is required'),
  compliance: z.enum(['Compliant', 'Non-Compliant']),
  technicalScore: z.string().min(1, 'Technical score is required'),
  financialScore: z.string().min(1, 'Financial score is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitBidModal({ isOpen, onClose }: Props) {
  const [submitBid, { isLoading }] = useSubmitBidMutation();
  const { data: tenders = [] } = useGetTendersQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await submitBid({
        ...data,
        bidAmount: Number(data.bidAmount),
        technicalScore: Number(data.technicalScore),
        financialScore: Number(data.financialScore),
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'UNDER_REVIEW',
      }).unwrap();
      toast.success('Supplier bid submitted successfully');
      onClose();
    } catch {
      toast.error('Failed to submit bid');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Supplier Bid">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Tender *</label>
            <select {...register('tenderNumber')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {tenders.map((t) => (
                <option key={t.id} value={t.tenderNumber}>{t.tenderNumber} — {t.title}</option>
              ))}
            </select>
            {errors.tenderNumber && <p className="text-sm text-destructive">{errors.tenderNumber.message}</p>}
          </div>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Bid Amount (RWF) *" type="number" {...register('bidAmount')} error={errors.bidAmount?.message} placeholder="e.g. 39800000" />
          <div className="space-y-1">
            <label className="text-sm font-medium">Compliance Check *</label>
            <select {...register('compliance')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Technical Score (1-100) *" type="number" {...register('technicalScore')} error={errors.technicalScore?.message} placeholder="e.g. 88" />
          <Input label="Financial Score (1-100) *" type="number" {...register('financialScore')} error={errors.financialScore?.message} placeholder="e.g. 92" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Bid</Button>
        </div>
      </form>
    </Modal>
  );
}
