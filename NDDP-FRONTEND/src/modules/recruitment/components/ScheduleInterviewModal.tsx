import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, Input, Button } from '@/components/ui';
import { useScheduleInterviewMutation, useGetApplicationsQuery } from '../api/recruitment.api';
import toast from 'react-hot-toast';

const interviewSchema = z.object({
  applicationId: z.string().min(1, 'Please select a candidate'),
  interviewType: z.string().min(1, 'Type is required'),
  scheduledDate: z.string().min(1, 'Date is required'),
  scheduledTime: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  meetingLink: z.string().optional(),
  panelMembers: z.string().min(3, 'Enter at least one panel member'),
});

type InterviewFormValues = z.infer<typeof interviewSchema>;

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<InterviewFormValues>;
}

export function ScheduleInterviewModal({ isOpen, onClose, initialData }: ScheduleInterviewModalProps) {
  const [scheduleInterview, { isLoading }] = useScheduleInterviewMutation();
  const { data: appsData } = useGetApplicationsQuery({ limit: 100 });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: initialData || {
      applicationId: '',
      interviewType: 'Technical',
      scheduledDate: '',
      scheduledTime: '',
      location: 'Kigali HQ',
      meetingLink: '',
      panelMembers: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || {
        applicationId: '',
        interviewType: 'Technical',
        scheduledDate: '',
        scheduledTime: '',
        location: 'Kigali HQ',
        meetingLink: '',
        panelMembers: '',
      });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data: InterviewFormValues) => {
    try {
      const dto = {
        type: data.interviewType,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        location: data.location,
        meetingLink: data.meetingLink,
        panelMembers: data.panelMembers.split(',').map(s => s.trim()),
      };
      await scheduleInterview({ applicationId: data.applicationId, dto }).unwrap();
      toast.success(initialData ? 'Interview rescheduled successfully' : 'Interview scheduled successfully');
      onClose();
      reset();
    } catch (error) {
      toast.error('Failed to schedule interview');
    }
  };

  const applications = appsData?.data || [];
  const validCandidates = applications.filter(a => ['SCREENING', 'SHORTLISTED', 'INTERVIEW'].includes(a.status));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Reschedule Interview" : "Schedule Interview"}
      description="Set up a new interview panel for a candidate."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Candidate <span className="text-destructive">*</span></label>
          <select
            {...register('applicationId')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!!initialData?.applicationId}
          >
            <option value="">Select Candidate...</option>
            {validCandidates.map(app => (
              <option key={app.id} value={app.id}>
                {app.candidateName} - {app.position} ({app.applicationNumber})
              </option>
            ))}
          </select>
          {errors.applicationId && <p className="text-xs text-destructive">{errors.applicationId.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Interview Type</label>
            <select
              {...register('interviewType')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="HR Screening">HR Screening</option>
              <option value="Technical">Technical</option>
              <option value="Leadership Panel">Leadership Panel</option>
              <option value="Final Interview">Final Interview</option>
            </select>
            {errors.interviewType && <p className="text-xs text-destructive">{errors.interviewType.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Panel Members (comma-separated)</label>
            <Input {...register('panelMembers')} placeholder="John Doe, Jane Smith" />
            {errors.panelMembers && <p className="text-xs text-destructive">{errors.panelMembers.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Date <span className="text-destructive">*</span></label>
            <Input type="date" {...register('scheduledDate')} />
            {errors.scheduledDate && <p className="text-xs text-destructive">{errors.scheduledDate.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Time <span className="text-destructive">*</span></label>
            <Input type="time" {...register('scheduledTime')} />
            {errors.scheduledTime && <p className="text-xs text-destructive">{errors.scheduledTime.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Location</label>
            <Input {...register('location')} placeholder="Room 4B or Virtual" />
            {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Meeting Link (Optional)</label>
            <Input {...register('meetingLink')} placeholder="https://meet.google.com/..." />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Reschedule' : 'Schedule Interview'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
