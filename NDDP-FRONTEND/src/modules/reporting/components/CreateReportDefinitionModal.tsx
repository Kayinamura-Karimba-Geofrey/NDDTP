import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateReportDefinitionMutation } from '../api/reporting.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  format: z.enum(['PDF', 'Excel', 'CSV', 'JSON']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateReportDefinitionModal({ isOpen, onClose }: Props) {
  const [createReport, { isLoading }] = useCreateReportDefinitionMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createReport({
        ...data,
        owner: 'You',
        status: 'ACTIVE',
      }).unwrap();
      toast.success('Report template configured successfully');
      onClose();
    } catch {
      toast.error('Failed to configure report');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Report Template">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Report Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Leave Roster Summary" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Domain Category *</label>
            <select {...register('category')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Personnel">Personnel / HR</option>
              <option value="Finance">Finance / Budget</option>
              <option value="Procurement">Procurement</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Medical">Medical Bay</option>
              <option value="Audit">Audit Logs</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Default Format *</label>
            <select {...register('format')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="PDF">Portable Document Format (PDF)</option>
              <option value="Excel">Microsoft Excel Spreadsheet (XLSX)</option>
              <option value="CSV">Comma Separated Values (CSV)</option>
              <option value="JSON">Structured JSON Payload</option>
            </select>
          </div>
        </div>
        <Input label="Description *" {...register('description')} error={errors.description?.message} placeholder="e.g. Active and inactive personnel roster" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Template</Button>
        </div>
      </form>
    </Modal>
  );
}
