import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useIssueClearanceMutation } from '../api/medical.api';
import toast from 'react-hot-toast';

const schema = z.object({
  personnelName: z.string().min(1, 'Personnel name is required'),
  clearanceType: z.string().min(1, 'Clearance type is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function IssueClearanceModal({ isOpen, onClose }: Props) {
  const [issue, { isLoading }] = useIssueClearanceMutation();

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
      await issue(data).unwrap();
      toast.success('Clearance issued successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to issue clearance');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Issue Medical Clearance">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Personnel Name"
          {...register('personnelName')}
          error={errors.personnelName?.message}
          placeholder="Name of individual"
        />
        <div className="space-y-1">
          <label className="text-sm font-medium">Clearance Type</label>
          <select
            {...register('clearanceType')}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select type...</option>
            <option value="General Duty">General Duty</option>
            <option value="Airborne Qualified">Airborne Qualified</option>
            <option value="Deployment Ready">Deployment Ready</option>
            <option value="Return to Duty">Return to Duty</option>
            <option value="Special Operations">Special Operations</option>
          </select>
          {errors.clearanceType && (
            <p className="text-sm text-destructive">{errors.clearanceType.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Issue Date"
            type="date"
            {...register('issueDate')}
            error={errors.issueDate?.message}
          />
          <Input
            label="Expiry Date"
            type="date"
            {...register('expiryDate')}
            error={errors.expiryDate?.message}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Issue Clearance
          </Button>
        </div>
      </form>
    </Modal>
  );
}
