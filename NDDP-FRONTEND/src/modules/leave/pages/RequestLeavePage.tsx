import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { useGetLeaveTypesQuery } from '../api/leave.api';

const STEPS = ['Leave Details', 'Validation', 'Review', 'Submit'];

export function RequestLeavePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { data: leaveTypes = [] } = useGetLeaveTypesQuery();

  const handleSubmit = () => {
    toast.success('Leave request submitted — LV-2026-0146');
    navigate('/leave/my-leave');
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Request Leave' }]} title="Request Leave" description="Multi-step leave request wizard" />
      <LeaveSubNav />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${step === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}. {s}</button>
        ))}
      </div>
      {step === 0 && (
        <Card><CardHeader><CardTitle className="text-base">Leave Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm"><span className="font-medium">Leave Type</span>
              <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{leaveTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
            </label>
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
            <label className="text-sm"><span className="font-medium">Duration</span>
              <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Full Day</option><option>Half Day (AM)</option><option>Half Day (PM)</option></select>
            </label>
            <Input label="Reason" className="sm:col-span-2" />
            <div className="sm:col-span-2 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">Supporting documents (if required)<input type="file" className="mt-2 block mx-auto text-xs" /></div>
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
            <p><strong>Leave Type:</strong> Annual Leave</p>
            <p><strong>Dates:</strong> Jul 15 – Jul 19, 2026</p>
            <p><strong>Working Days:</strong> 5</p>
            <p><strong>Balance After:</strong> 16 days remaining</p>
            <p><strong>Approver:</strong> Jean Mukamana</p>
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
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Previous</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/leave/my-leave')}>Cancel</Button>
          {step < STEPS.length - 1 ? <Button onClick={() => setStep((s) => s + 1)}>Next</Button> : <Button onClick={handleSubmit}>Submit Request</Button>}
        </div>
      </div>
    </div>
  );
}
