import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateRfqMutation } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  items: z.string().min(1, 'Item count is required'),
  suppliersInvited: z.string().min(1, 'Suppliers invited count is required'),
  closingDate: z.string().min(1, 'Closing date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRfqModal({ isOpen, onClose }: Props) {
  const [createRfq, { isLoading }] = useCreateRfqMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createRfq({
        ...data,
        items: Number(data.items),
        suppliersInvited: Number(data.suppliersInvited),
        rfqNumber: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'OPEN',
      }).unwrap();
      toast.success('Request for Quotation published');
      onClose();
    } catch {
      toast.error('Failed to publish RFQ');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New RFQ Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="RFQ Title *" {...register('title')} error={errors.title?.message} placeholder="e.g. IT Consumables Q3 Procurement" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distinct Items count *" type="number" {...register('items')} error={errors.items?.message} placeholder="e.g. 5" />
          <Input label="Suppliers to Invite *" type="number" {...register('suppliersInvited')} error={errors.suppliersInvited?.message} placeholder="e.g. 3" />
        </div>
        <Input label="Closing Date *" type="date" {...register('closingDate')} error={errors.closingDate?.message} />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Publish RFQ</Button>
        </div>
      </form>
    </Modal>
  );
}
