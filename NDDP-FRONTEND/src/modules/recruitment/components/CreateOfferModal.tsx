import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useGetApplicationsQuery, useCreateOfferMutation } from '../api/recruitment.api';
import toast from 'react-hot-toast';

const offerSchema = z.object({
  applicationId: z.string().min(1, 'Candidate is required'),
  rankOrLevel: z.string().min(1, 'Rank or level is required'),
  salary: z.number().min(0, 'Salary is required'),
  startDate: z.string().min(1, 'Start date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  additionalNotes: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerSchema>;

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOfferModal({ isOpen, onClose }: CreateOfferModalProps) {
  const [createOffer, { isLoading }] = useCreateOfferMutation();
  const { data: appsData } = useGetApplicationsQuery({ limit: 100 });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      applicationId: '',
      rankOrLevel: '',
      salary: 0,
      startDate: '',
      expiryDate: '',
      additionalNotes: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: OfferFormValues) => {
    try {
      await createOffer(data).unwrap();
      toast.success('Offer successfully created and saved as DRAFT');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to create offer');
    }
  };

  const applications = appsData?.data || [];
  // Typically, offers are generated for people who have completed the interview
  const validCandidates = applications.filter(a => ['INTERVIEW', 'OFFERED', 'SHORTLISTED'].includes(a.status));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Employment Offer"
      description="Draft an official offer for a successful candidate."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Candidate <span className="text-destructive">*</span></label>
          <select
            {...register('applicationId')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select Candidate...</option>
            {validCandidates.map(app => (
              <option key={app.id} value={app.id}>
                {app.candidateName} - {app.position}
              </option>
            ))}
          </select>
          {errors.applicationId && <p className="text-xs text-destructive">{errors.applicationId.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Rank / Level <span className="text-destructive">*</span></label>
            <Input {...register('rankOrLevel')} placeholder="e.g. Captain / Grade 4" />
            {errors.rankOrLevel && <p className="text-xs text-destructive">{errors.rankOrLevel.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Salary (FRW) <span className="text-destructive">*</span></label>
            <Input type="number" {...register('salary', { valueAsNumber: true })} min={0} step={10000} />
            {errors.salary && <p className="text-xs text-destructive">{errors.salary.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Expected Start Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('startDate')} />
            {errors.startDate && <p className="text-xs text-destructive">{errors.startDate.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Offer Expiry Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('expiryDate')} />
            {errors.expiryDate && <p className="text-xs text-destructive">{errors.expiryDate.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Additional Notes (Optional)</label>
          <textarea
            {...register('additionalNotes')}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any special conditions or bonuses..."
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Draft Offer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
