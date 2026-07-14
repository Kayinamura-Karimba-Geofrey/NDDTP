import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateVisitRequestMutation, useGetVisitorDirectoryQuery, useGetVisitSitesQuery } from '../api/visitor.api';
import toast from 'react-hot-toast';

const schema = z.object({
  visitorId: z.string().min(1, 'Please select a visitor'),
  host: z.string().min(2, 'Host name is required'),
  siteId: z.string().min(1, 'Please select visit site location'),
  purpose: z.string().min(3, 'Purpose is required'),
  scheduledAt: z.string().min(1, 'Scheduled arrival date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVisitRequestModal({ isOpen, onClose }: Props) {
  const [createRequest, { isLoading }] = useCreateVisitRequestMutation();
  const { data: visitors = [] } = useGetVisitorDirectoryQuery();
  const { data: sites = [] } = useGetVisitSitesQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedVisitor = visitors.find((v) => v.id === data.visitorId);
      const selectedSite = sites.find((s) => s.id === data.siteId);
      await createRequest({
        ...data,
        visitor: selectedVisitor?.name ?? '—',
        site: selectedSite?.name ?? '—',
        status: 'PENDING',
      }).unwrap();
      toast.success('Visit request submitted successfully');
      onClose();
    } catch {
      toast.error('Failed to submit visit request');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Visit Access">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Visitor *</label>
            <select {...register('visitorId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {visitors.map((v) => (
                <option key={v.id} value={v.id}>{v.name} ({v.organization})</option>
              ))}
            </select>
            {errors.visitorId && <p className="text-sm text-destructive">{errors.visitorId.message}</p>}
          </div>
          <Input label="Host Personnel *" {...register('host')} error={errors.host?.message} placeholder="e.g. HR Manager / Security Desk" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Visit Location Site *</label>
            <select {...register('siteId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="">Select...</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.location})</option>
              ))}
            </select>
            {errors.siteId && <p className="text-sm text-destructive">{errors.siteId.message}</p>}
          </div>
          <Input label="Scheduled Arrival Date & Time *" type="datetime-local" {...register('scheduledAt')} error={errors.scheduledAt?.message} />
        </div>
        <Input label="Purpose of Visit *" {...register('purpose')} error={errors.purpose?.message} placeholder="e.g. Audit fieldwork / Contract review" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Request Access</Button>
        </div>
      </form>
    </Modal>
  );
}
