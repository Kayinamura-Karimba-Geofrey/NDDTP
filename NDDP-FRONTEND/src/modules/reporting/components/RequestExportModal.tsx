import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useRequestExportMutation } from '../api/reporting.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Export job title name is required'),
  format: z.enum(['Excel', 'PDF', 'CSV', 'JSON']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestExportModal({ isOpen, onClose }: Props) {
  const [requestExport, { isLoading }] = useRequestExportMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await requestExport({
        ...data,
        requestedBy: 'You',
        requestedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'QUEUED',
      }).unwrap();
      toast.success('Data extraction job queued');
      onClose();
    } catch {
      toast.error('Failed to request data extraction');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Data Export">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Export Job Title Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Employee List Q2" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Export File Format *</label>
          <select {...register('format')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="Excel">Microsoft Excel Spreadsheet (XLSX)</option>
            <option value="PDF">Portable Document Format (PDF)</option>
            <option value="CSV">Comma Separated Values (CSV)</option>
            <option value="JSON">Structured JSON Payload</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Request Export</Button>
        </div>
      </form>
    </Modal>
  );
}
