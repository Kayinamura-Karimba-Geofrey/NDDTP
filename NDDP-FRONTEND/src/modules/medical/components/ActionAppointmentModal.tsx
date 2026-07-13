import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Button } from '@/components/ui';
import { useUpdateAppointmentStatusMutation } from '../api/medical.api';
import type { MedicalAppointment } from '../constants/medical-data';
import toast from 'react-hot-toast';

const schema = z.object({
  comments: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  appointment: MedicalAppointment | null;
  action: 'CANCELLED' | 'COMPLETED' | 'RESCHEDULED' | null;
  onClose: () => void;
}

export function ActionAppointmentModal({ isOpen, appointment, action, onClose }: Props) {
  const [updateStatus, { isLoading }] = useUpdateAppointmentStatusMutation();

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    if (!appointment || !action) return;
    try {
      await updateStatus({
        id: appointment.id,
        status: action,
        comments: data.comments,
      }).unwrap();
      toast.success(`Appointment ${action.toLowerCase()} successfully`);
      onClose();
    } catch (error) {
      toast.error(`Failed to update appointment status`);
    }
  };

  const actionLabels = {
    CANCELLED: 'Cancel Appointment',
    COMPLETED: 'Complete Appointment',
    RESCHEDULED: 'Reschedule Appointment',
  };

  const actionColors = {
    CANCELLED: 'danger',
    COMPLETED: 'default',
    RESCHEDULED: 'secondary',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={action ? actionLabels[action] : 'Update Appointment'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {appointment && (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p><strong>Appointment:</strong> {appointment.appointmentNumber}</p>
            <p><strong>Patient:</strong> {appointment.personnelName}</p>
            <p><strong>Doctor:</strong> {appointment.medicalProfessional}</p>
            <p><strong>Date & Time:</strong> {appointment.date} at {appointment.time}</p>
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium">Comments / Reason (Optional)</label>
          <textarea
            {...register('comments')}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
            placeholder="Add any necessary notes..."
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant={action ? (actionColors[action] as any) : 'default'} isLoading={isLoading}>
            Confirm {action === 'CANCELLED' ? 'Cancellation' : action === 'RESCHEDULED' ? 'Reschedule' : 'Completion'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
