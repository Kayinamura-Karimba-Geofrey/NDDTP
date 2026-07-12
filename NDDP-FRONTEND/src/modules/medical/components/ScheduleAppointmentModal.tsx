import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useScheduleAppointmentMutation } from '../api/medical.api';
import toast from 'react-hot-toast';

const schema = z.object({
  department: z.string().min(1, 'Department is required'),
  medicalProfessional: z.string().min(1, 'Doctor is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  appointmentType: z.string().min(1, 'Type is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleAppointmentModal({ isOpen, onClose }: Props) {
  const [schedule, { isLoading }] = useScheduleAppointmentMutation();

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
      await schedule(data).unwrap();
      toast.success('Appointment scheduled successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to schedule appointment');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Medical Appointment">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Department/Clinic"
          {...register('department')}
          error={errors.department?.message}
          placeholder="e.g. Cardiology, General Practice"
        />
        <Input
          label="Medical Professional"
          {...register('medicalProfessional')}
          error={errors.medicalProfessional?.message}
          placeholder="Doctor's name"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            {...register('date')}
            error={errors.date?.message}
          />
          <Input
            label="Time"
            type="time"
            {...register('time')}
            error={errors.time?.message}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Appointment Type</label>
          <select
            {...register('appointmentType')}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select type...</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Physical Exam">Physical Exam</option>
            <option value="Vaccination">Vaccination</option>
          </select>
          {errors.appointmentType && (
            <p className="text-sm text-destructive">{errors.appointmentType.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
}
