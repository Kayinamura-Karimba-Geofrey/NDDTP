import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateNotificationTemplateMutation } from '../api/notification.api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(2, 'Template Code is required'),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'MULTI']),
  subject: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateNotificationTemplateModal({ isOpen, onClose }: Props) {
  const [createTemplate, { isLoading }] = useCreateNotificationTemplateMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createTemplate({
        ...data,
        language: 'English',
        priority: 'Normal',
        status: 'ACTIVE',
        lastModified: new Date().toISOString().split('T')[0],
      }).unwrap();
      toast.success('Communication template created successfully');
      onClose();
    } catch {
      toast.error('Failed to create template');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Communication Template">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Template Name *" {...register('name')} error={errors.name?.message} placeholder="e.g. Leave Approval Notification" />
          <Input label="Reference Code *" {...register('code')} error={errors.code?.message} placeholder="e.g. LEAVE_APPROVED" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Channel *</label>
          <select {...register('channel')} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <option value="EMAIL">Email Dispatch</option>
            <option value="SMS">Short Message Service (SMS)</option>
            <option value="PUSH">Mobile Push Notification</option>
            <option value="IN_APP">In-App Inbox</option>
            <option value="MULTI">Multi-channel</option>
          </select>
        </div>
        <Input label="Subject Line (Optional)" {...register('subject')} placeholder="e.g. Your leave request has been approved" />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Save Template</Button>
        </div>
      </form>
    </Modal>
  );
}
