import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import toast from 'react-hot-toast';

const requestSchema = z.object({
  department: z.string().min(2, 'Department is required'),
  roleTitle: z.string().min(2, 'Role title is required'),
  headcount: z.number().min(1, 'At least 1 required'),
  urgency: z.string().min(1, 'Urgency is required'),
  justification: z.string().min(10, 'Provide a detailed justification'),
});

type RequestFormValues = z.infer<typeof requestSchema>;

interface CreateWorkforceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkforceRequestModal({ isOpen, onClose }: CreateWorkforceRequestModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      department: '',
      roleTitle: '',
      headcount: 1,
      urgency: 'Medium',
      justification: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: RequestFormValues) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Workforce request submitted for command review');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Workforce Request"
      description="Request additional personnel for your unit or department."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Department / Unit <span className="text-destructive">*</span></label>
            <Input {...register('department')} placeholder="e.g. 1st Battalion" />
            {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Role Title <span className="text-destructive">*</span></label>
            <Input {...register('roleTitle')} placeholder="e.g. Infantry Officer" />
            {errors.roleTitle && <p className="text-xs text-destructive">{errors.roleTitle.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Requested Headcount <span className="text-destructive">*</span></label>
            <Input type="number" {...register('headcount', { valueAsNumber: true })} min={1} />
            {errors.headcount && <p className="text-xs text-destructive">{errors.headcount.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Urgency <span className="text-destructive">*</span></label>
            <select
              {...register('urgency')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Low">Low (Strategic)</option>
              <option value="Medium">Medium (Standard)</option>
              <option value="High">High (Immediate)</option>
              <option value="Critical">Critical (Mission Dep)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Justification <span className="text-destructive">*</span></label>
          <textarea
            {...register('justification')}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Explain why these additional resources are needed..."
          />
          {errors.justification && <p className="text-xs text-destructive">{errors.justification.message}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
