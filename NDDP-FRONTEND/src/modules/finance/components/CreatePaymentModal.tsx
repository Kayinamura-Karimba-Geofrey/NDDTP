import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePaymentMutation, useGetInvoicesQuery } from '../api/finance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  invoiceId: z.string().min(1, 'Please select an invoice'),
  paymentDate: z.string().min(1, 'Payment date is required'),
  method: z.string().min(1, 'Payment method is required'),
  reference: z.string().min(2, 'Payment reference code is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePaymentModal({ isOpen, onClose }: Props) {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const { data: invoices = [] } = useGetInvoicesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedInvoice = invoices.find((i) => i.id === data.invoiceId);
      await createPayment({
        ...data,
        supplier: selectedInvoice?.supplier ?? '—',
        invoice: selectedInvoice?.invoiceNumber ?? '—',
        amount: selectedInvoice?.amount ?? 0,
        paymentNumber: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'COMPLETED',
      }).unwrap();
      toast.success('Disbursement recorded successfully');
      onClose();
    } catch {
      toast.error('Failed to log payment transaction');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment Payout">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Invoice to Pay *</label>
          <select {...register('invoiceId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {invoices.filter((i) => i.status === 'PENDING').map((i) => (
              <option key={i.id} value={i.id}>{i.invoiceNumber} — {i.supplier} (Value: {(i.amount / 1e6).toFixed(1)}M RWF)</option>
            ))}
          </select>
          {errors.invoiceId && <p className="text-sm text-destructive">{errors.invoiceId.message}</p>}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Payment Date *" type="date" {...register('paymentDate')} error={errors.paymentDate?.message} />
          <div className="space-y-1">
            <label className="text-sm font-medium">Disbursement Method *</label>
            <select {...register('method')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check payment</option>
              <option value="Mobile Money">Mobile Money (MoMo)</option>
            </select>
          </div>
          <Input label="Transaction Ref *" {...register('reference')} error={errors.reference?.message} placeholder="e.g. TRF-20260708-001" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Record Payout</Button>
        </div>
      </form>
    </Modal>
  );
}
