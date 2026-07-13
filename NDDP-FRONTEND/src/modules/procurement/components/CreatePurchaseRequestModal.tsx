import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreatePurchaseRequestMutation, useGetPurchaseRequisitionsQuery } from '../api/procurement.api';
import toast from 'react-hot-toast';

const schema = z.object({
  linkedRequisition: z.string().min(1, 'Linked requisition is required'),
  supplierType: z.enum(['Registered', 'Non-Registered']),
  procurementMethod: z.enum(['RFQ', 'Direct', 'Open Tender']),
  expectedDelivery: z.string().min(1, 'Expected delivery date is required'),
  budgetReference: z.string().min(2, 'Budget reference is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePurchaseRequestModal({ isOpen, onClose }: Props) {
  const [createPR, { isLoading }] = useCreatePurchaseRequestMutation();
  const { data } = useGetPurchaseRequisitionsQuery({ page: 1, limit: 100 });
  const requisitions = data?.data ?? [];
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPR({
        ...data,
        requestNumber: `PUR-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: data.procurementMethod === 'RFQ' ? 'RFQ' : 'PENDING_APPROVAL',
      }).unwrap();
      toast.success('Procurement request created');
      onClose();
    } catch {
      toast.error('Failed to create procurement request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Procurement Request">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Link Requisition *</label>
          <select {...register('linkedRequisition')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {requisitions.map((r) => (
              <option key={r.id} value={r.requisitionNumber}>{r.requisitionNumber} — {r.department} ({r.category})</option>
            ))}
          </select>
          {errors.linkedRequisition && <p className="text-sm text-destructive">{errors.linkedRequisition.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Supplier Type *</label>
            <select {...register('supplierType')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Registered">Registered Vendor</option>
              <option value="Non-Registered">Non-Registered Vendor</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Procurement Method *</label>
            <select {...register('procurementMethod')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="RFQ">Request for Quotation (RFQ)</option>
              <option value="Direct">Direct Procurement</option>
              <option value="Open Tender">Open National Tender</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Expected Delivery *" type="date" {...register('expectedDelivery')} error={errors.expectedDelivery?.message} />
          <Input label="Budget Reference Code *" {...register('budgetReference')} error={errors.budgetReference?.message} placeholder="e.g. FY2026-IT-042" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Create Request</Button>
        </div>
      </form>
    </Modal>
  );
}
