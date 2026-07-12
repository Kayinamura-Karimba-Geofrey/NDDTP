import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useReportIncidentMutation } from '../api/medical.api';
import toast from 'react-hot-toast';

const schema = z.object({
  incidentDate: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  involvedPersonnel: z.string().min(1, 'Involved personnel required'),
  description: z.string().min(1, 'Description is required'),
  severity: z.string().min(1, 'Severity is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIncidentModal({ isOpen, onClose }: Props) {
  const [report, { isLoading }] = useReportIncidentMutation();

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
      await report(data).unwrap();
      toast.success('Incident reported successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to report incident');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report Medical Incident">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date of Incident"
            type="date"
            {...register('incidentDate')}
            error={errors.incidentDate?.message}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium">Severity</label>
            <select
              {...register('severity')}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Select severity...</option>
              <option value="Minor">Minor (First aid)</option>
              <option value="Moderate">Moderate (Medical treatment)</option>
              <option value="Severe">Severe (Hospitalization)</option>
              <option value="Critical">Critical</option>
            </select>
            {errors.severity && (
              <p className="text-sm text-destructive">{errors.severity.message}</p>
            )}
          </div>
        </div>
        <Input
          label="Location"
          {...register('location')}
          error={errors.location?.message}
          placeholder="Where did the incident occur?"
        />
        <Input
          label="Involved Personnel"
          {...register('involvedPersonnel')}
          error={errors.involvedPersonnel?.message}
          placeholder="Names or IDs of personnel involved"
        />
        <div className="space-y-1">
          <label className="text-sm font-medium">Incident Description</label>
          <textarea
            {...register('description')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px] ${errors.description ? 'border-destructive' : 'border-input'}`}
            placeholder="Describe what happened in detail..."
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} variant="destructive">
            Submit Report
          </Button>
        </div>
      </form>
    </Modal>
  );
}
