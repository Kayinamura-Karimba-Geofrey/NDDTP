import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useCreateReferralMutation } from '../api/medical.api';
import toast from 'react-hot-toast';

const schema = z.object({
  patientName: z.string().min(1, 'Patient name is required'),
  targetFacility: z.string().min(1, 'Target facility is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  reason: z.string().min(1, 'Reason for referral is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateReferralModal({ isOpen, onClose }: Props) {
  const [createReferral, { isLoading }] = useCreateReferralMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createReferral(data).unwrap();
      toast.success('Referral created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create referral');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Medical Referral">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Patient Name"
          {...register('patientName')}
          error={errors.patientName?.message}
          placeholder="Name of patient"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Target Facility"
            {...register('targetFacility')}
            error={errors.targetFacility?.message}
            placeholder="e.g. King Faisal Hospital"
          />
          <Input
            label="Specialty"
            {...register('specialty')}
            error={errors.specialty?.message}
            placeholder="e.g. Neurology"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Referral</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Detailed medical justification..."
          />
          {errors.reason && (
            <p className="text-sm text-destructive">{errors.reason.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Submit Referral
          </Button>
        </div>
      </form>
    </Modal>
  );
}
