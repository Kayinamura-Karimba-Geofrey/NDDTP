import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateInvoiceMutation } from '../api/finance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  invoiceNumber: z.string().min(2, 'Invoice code is required'),
  supplier: z.string().min(2, 'Supplier name is required'),
  purchaseOrder: z.string().optional(),
  amount: z.string().min(1, 'Amount is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateInvoiceModal({ isOpen, onClose }: Props) {
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createInvoice({
        ...data,
        amount: Number(data.amount),
        status: 'PENDING',
      }).unwrap();
      toast.success('Supplier invoice logged successfully');
      onClose();
    } catch {
      toast.error('Failed to log invoice');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Supplier Invoice">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Invoice Number *" {...register('invoiceNumber')} error={errors.invoiceNumber?.message} placeholder="e.g. INV-MED-2026-0456" />
          <Input label="Supplier Company *" {...register('supplier')} error={errors.supplier?.message} placeholder="e.g. MedEquip Rwanda" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Linked Purchase Order" {...register('purchaseOrder')} placeholder="e.g. PO-2026-0156" />
          <Input label="Invoice Value (RWF) *" type="number" {...register('amount')} error={errors.amount?.message} placeholder="e.g. 45000000" />
        </div>
        <Input label="Payment Due Date *" type="date" {...register('dueDate')} error={errors.dueDate?.message} />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Log Invoice</Button>
        </div>
      </form>
    </Modal>
  );
}
