import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateRequisitionMutation } from '../api/recruitment.api';
import toast from 'react-hot-toast';

const requisitionSchema = z.object({
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  vacancies: z.number().min(1, 'At least 1 vacancy required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  expectedStartDate: z.string().min(1, 'Start date is required'),
  hiringManager: z.string().min(1, 'Hiring manager is required'),
  budgetCode: z.string().optional(),
});

type RequisitionFormValues = z.infer<typeof requisitionSchema>;

interface CreateRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRequisitionModal({ isOpen, onClose }: CreateRequisitionModalProps) {
  const [createRequisition, { isLoading }] = useCreateRequisitionMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RequisitionFormValues>({
    resolver: zodResolver(requisitionSchema),
    defaultValues: {
      position: '',
      department: '',
      vacancies: 1,
      employmentType: 'Permanent',
      expectedStartDate: '',
      hiringManager: '',
      budgetCode: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: RequisitionFormValues) => {
    try {
      await createRequisition(data).unwrap();
      toast.success('Job requisition created successfully and sent for budget approval');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to create requisition');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Job Requisition"
      description="Create a formal request to open a new job position."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Position <span className="text-destructive">*</span></label>
            <Input {...register('position')} placeholder="e.g. Signals Officer" />
            {errors.position && <p className="text-xs text-destructive">{errors.position.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Department <span className="text-destructive">*</span></label>
            <Input {...register('department')} placeholder="e.g. Communications" />
            {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Vacancies <span className="text-destructive">*</span></label>
            <Input type="number" {...register('vacancies', { valueAsNumber: true })} min={1} />
            {errors.vacancies && <p className="text-xs text-destructive">{errors.vacancies.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Employment Type <span className="text-destructive">*</span></label>
            <select
              {...register('employmentType')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Expected Start Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('expectedStartDate')} />
            {errors.expectedStartDate && <p className="text-xs text-destructive">{errors.expectedStartDate.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Hiring Manager <span className="text-destructive">*</span></label>
            <Input {...register('hiringManager')} placeholder="Name or ID" />
            {errors.hiringManager && <p className="text-xs text-destructive">{errors.hiringManager.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Budget Code (Optional)</label>
          <Input {...register('budgetCode')} placeholder="e.g. BGT-2026-HR" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Requisition'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
