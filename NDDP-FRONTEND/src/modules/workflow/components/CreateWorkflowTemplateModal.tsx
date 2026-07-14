import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateWorkflowTemplateMutation } from '../api/workflow.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  service: z.string().min(1, 'Associated service domain is required'),
  version: z.string().min(2, 'Initial version is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkflowTemplateModal({ isOpen, onClose }: Props) {
  const [createTemplate, { isLoading }] = useCreateWorkflowTemplateMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createTemplate({
        ...data,
        category: data.service,
        status: 'ACTIVE',
        createdBy: 'System Admin',
        lastModified: new Date().toISOString().split('T')[0],
      }).unwrap();
      toast.success('Workflow template registered successfully');
      onClose();
    } catch {
      toast.error('Failed to register template');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Establish Process Template">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Template Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Leave Approval" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Service Domain *</label>
            <select {...register('service')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
              <option value="Personnel">Personnel / HR</option>
              <option value="Procurement">Procurement</option>
              <option value="Finance">Finance</option>
              <option value="Fleet">Logistics & Fleet</option>
              <option value="Medical">Medical Bay</option>
              <option value="DMS">DMS Records</option>
            </select>
          </div>
          <Input label="Initial Version *" {...register('version')} error={errors.version?.message} placeholder="e.g. v1.0" />
        </div>
        <Input label="Description *" {...register('description')} error={errors.description?.message} placeholder="e.g. Employee leave request — supervisor → HR" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Template</Button>
        </div>
      </form>
    </Modal>
  );
}
