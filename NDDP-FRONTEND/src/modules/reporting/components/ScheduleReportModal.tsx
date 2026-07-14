import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useScheduleReportMutation, useGetReportLibraryQuery } from '../api/reporting.api';
import toast from 'react-hot-toast';

const schema = z.object({
  reportId: z.string().min(1, 'Please select a report'),
  frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly']),
  channelsRaw: z.string().min(2, 'Delivery channels (comma separated) is required'),
  recipients: z.string().min(1, 'Recipient count is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleReportModal({ isOpen, onClose }: Props) {
  const [scheduleReport, { isLoading }] = useScheduleReportMutation();
  const { data: reports = [] } = useGetReportLibraryQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedReport = reports.find((r) => r.id === data.reportId);
      await scheduleReport({
        ...data,
        report: selectedReport?.name ?? '—',
        recipients: Number(data.recipients),
        channels: data.channelsRaw,
        nextRun: new Date(Date.now() + 86400000).toISOString().replace('T', ' ').slice(0, 16),
        status: 'SCHEDULED',
      }).unwrap();
      toast.success('Report scheduled successfully');
      onClose();
    } catch {
      toast.error('Failed to schedule report');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Scheduled Report Run">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Report Template *</label>
          <select {...register('reportId')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="">Select...</option>
            {reports.map((r) => (
              <option key={r.id} value={r.id}>{r.name} ({r.category})</option>
            ))}
          </select>
          {errors.reportId && <p className="text-sm text-destructive">{errors.reportId.message}</p>}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Cron Frequency *</label>
            <select {...register('frequency')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Daily">Daily run</option>
              <option value="Weekly">Weekly run</option>
              <option value="Monthly">Monthly run</option>
              <option value="Quarterly">Quarterly run</option>
            </select>
          </div>
          <Input label="Delivery Channels *" {...register('channelsRaw')} error={errors.channelsRaw?.message} placeholder="e.g. Email, DMS" />
          <Input label="Recipient Count *" type="number" {...register('recipients')} error={errors.recipients?.message} placeholder="e.g. 18" />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Schedule</Button>
        </div>
      </form>
    </Modal>
  );
}
