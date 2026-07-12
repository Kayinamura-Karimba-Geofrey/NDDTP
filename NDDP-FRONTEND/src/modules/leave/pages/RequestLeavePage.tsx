import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { useGetLeaveTypesQuery, useSubmitLeaveRequestMutation } from '../api/leave.api';

const STEPS = ['Leave Details', 'Validation', 'Review', 'Submit'];

const requestSchema = z.object({
  leaveTypeId: z.string().min(1, 'Select a leave type'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  duration: z.string().min(1, 'Duration is required'),
  reason: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

export function RequestLeavePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { data: leaveTypes = [] } = useGetLeaveTypesQuery();
  const [submitRequest, { isLoading }] = useSubmitLeaveRequestMutation();

  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { leaveTypeId: '', startDate: '', endDate: '', duration: 'Full Day', reason: '' },
    mode: 'onTouched',
  });

  const handleNext = async () => {
    if (step === 0) {
      const isValid = await trigger();
      if (!isValid) return;
    }
    setStep((s) => s + 1);
  };

  const onSubmit = async (data: RequestFormValues) => {
    try {
      await submitRequest(data).unwrap();
      toast.success('Leave request submitted successfully');
      navigate('/leave/my-leave');
    } catch (error) {
      toast.error('Failed to submit request');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Request Leave' }]} title="Request Leave" description="Multi-step leave request wizard" />
      <LeaveSubNav />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => { if (i < step) setStep(i); }} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${step === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}. {s}</button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <Card><CardHeader><CardTitle className="text-base">Leave Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm"><span className="font-medium">Leave Type</span>
                <select {...register('leaveTypeId')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="">-- Select Type --</option>
                  {leaveTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                {errors.leaveTypeId && <span className="text-xs text-destructive">{errors.leaveTypeId.message}</span>}
              </label>
              <Input label="Start Date" type="date" {...register('startDate')} error={errors.startDate?.message} />
              <Input label="End Date" type="date" {...register('endDate')} error={errors.endDate?.message} />
              <label className="text-sm"><span className="font-medium">Duration</span>
                <select {...register('duration')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Full Day</option><option>Half Day (AM)</option><option>Half Day (PM)</option></select>
              </label>
              <Input label="Reason" className="sm:col-span-2" {...register('reason')} />
            </CardContent>
          </Card>
        )}
        {step === 1 && (
          <Card><CardHeader><CardTitle className="text-base">System Validation</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {['Leave balance sufficient (21 days available)', 'No public holidays in range', 'No existing leave overlap', 'Team staffing level acceptable', 'Policy compliance — 5 days notice met'].map((check, i) => (
                <div key={check} className={`rounded-lg border p-3 text-sm ${i === 3 ? 'border-warning bg-warning/5' : 'border-success/30 bg-success/5'}`}>
                  {i === 3 ? '⚠' : '✓'} {check}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {step === 2 && (
          <Card><CardHeader><CardTitle className="text-base">Review</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Leave Type:</strong> {leaveTypes.find(t => t.id === getValues('leaveTypeId'))?.name || 'Selected Type'}</p>
              <p><strong>Dates:</strong> {getValues('startDate')} – {getValues('endDate')}</p>
              <p><strong>Reason:</strong> {getValues('reason') || 'None provided'}</p>
            </CardContent>
          </Card>
        )}
        {step === 3 && (
          <Card><CardContent className="pt-6 text-center">
            <p className="font-medium">Ready to submit your leave request?</p>
            <p className="mt-2 text-sm text-muted-foreground">Your approver will be notified immediately.</p>
          </CardContent></Card>
        )}
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Previous</Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/leave/my-leave')}>Cancel</Button>
            {step < STEPS.length - 1 ? <Button type="button" onClick={handleNext}>Next</Button> : <Button type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit Request'}</Button>}
          </div>
        </div>
      </form>
    </div>
  );
}
