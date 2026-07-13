import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useNominateForAwardMutation } from '../api/performance.api';
import toast from 'react-hot-toast';

const schema = z.object({
  employee: z.string().min(1, 'Employee name is required'),
  award: z.string().min(1, 'Award type is required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
});
type FormData = z.infer<typeof schema>;

interface Props { isOpen: boolean; onClose: () => void; }

export function NominateForAwardModal({ isOpen, onClose }: Props) {
  const [nominate, { isLoading }] = useNominateForAwardMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await nominate(data).unwrap();
      toast.success('Nomination submitted for approval');
      onClose();
    } catch {
      toast.error('Failed to submit nomination');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nominate for Recognition Award">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Employee Name *" {...register('employee')} error={errors.employee?.message} placeholder="Full name" />
        <div className="space-y-1">
          <label className="text-sm font-medium">Award Type *</label>
          <select {...register('award')} className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ${errors.award ? 'border-destructive' : 'border-input'}`}>
            <option value="">Select award...</option>
            <option value="Employee of the Month">Employee of the Month</option>
            <option value="Innovation Award">Innovation Award</option>
            <option value="Long Service Award">Long Service Award</option>
            <option value="Excellence Award">Excellence Award</option>
            <option value="Commendation">Commendation</option>
          </select>
          {errors.award && <p className="text-sm text-destructive">{errors.award.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Reason for Nomination *</label>
          <textarea
            {...register('reason')}
            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm min-h-[100px] ${errors.reason ? 'border-destructive' : 'border-input'}`}
            placeholder="Describe specific achievements that warrant this recognition..."
          />
          {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Submit Nomination</Button>
        </div>
      </form>
    </Modal>
  );
}
