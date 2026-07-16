import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateVacancyMutation } from '../api/recruitment.api';
import toast from 'react-hot-toast';

const vacancySchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  employmentType: z.string().min(2, 'Employment type is required'),
  closingDate: z.string().min(1, 'Closing date is required'),
  description: z.string().min(10, 'Description is too short'),
});

type VacancyFormValues = z.infer<typeof vacancySchema>;

interface CreateVacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: VacancyFormValues;
}

export function CreateVacancyModal({ isOpen, onClose, initialData }: CreateVacancyModalProps) {
  const [createVacancy, { isLoading }] = useCreateVacancyMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancySchema),
    defaultValues: initialData || {
      jobTitle: '',
      department: '',
      location: 'Kigali HQ',
      employmentType: 'Permanent',
      closingDate: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData);
    } else if (isOpen && !initialData) {
      reset({
        jobTitle: '',
        department: '',
        location: 'Kigali HQ',
        employmentType: 'Permanent',
        closingDate: '',
        description: '',
      });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data: VacancyFormValues) => {
    try {
      await createVacancy(data).unwrap();
      toast.success(initialData ? 'Vacancy duplicated successfully' : 'Vacancy created successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to create vacancy');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Duplicate Vacancy" : "Create New Vacancy"}
      description="Fill out the details to open a new job requisition."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Job Title <span className="text-destructive">*</span></label>
            <Input {...register('jobTitle')} placeholder="e.g. Cyber Specialist" />
            {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Department <span className="text-destructive">*</span></label>
            <Input {...register('department')} placeholder="e.g. ICT" />
            {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Location</label>
            <Input {...register('location')} />
            {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Employment Type</label>
            <select
              {...register('employmentType')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
            {errors.employmentType && <p className="text-xs text-destructive">{errors.employmentType.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Closing Date <span className="text-destructive">*</span></label>
          <Input type="date" {...register('closingDate')} />
          {errors.closingDate && <p className="text-xs text-destructive">{errors.closingDate.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description <span className="text-destructive">*</span></label>
          <textarea
            {...register('description')}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe the responsibilities and requirements..."
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Duplicate' : 'Create Vacancy'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
