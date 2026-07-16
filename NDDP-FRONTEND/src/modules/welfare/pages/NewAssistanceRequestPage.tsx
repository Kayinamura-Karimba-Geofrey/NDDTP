import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { MOCK_PROGRAMS } from '../constants/welfare-data';

const STEPS = ['Assistance Type', 'Details', 'Review', 'Submit'];
const ASSISTANCE_TYPES = ['Financial Assistance', 'Emergency Assistance', 'Family Support', 'Education Assistance'];

export function NewAssistanceRequestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [assistanceType, setAssistanceType] = useState(ASSISTANCE_TYPES[0]);

  const handleSubmit = () => {
    toast.success('Assistance request submitted — WF-2026-0092');
    navigate('/welfare/my-welfare');
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Assistance', path: '/welfare/assistance' }, { label: 'New Request' }]} title="New Assistance Request" description="Multi-step welfare assistance wizard" />
      <WelfareSubNav />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${step === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}. {s}</button>
        ))}
      </div>
      {step === 0 && (
        <Card><CardHeader><CardTitle className="text-base">Select Assistance Type</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {ASSISTANCE_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => setAssistanceType(t)} className={`rounded-lg border p-4 text-left text-sm ${assistanceType === t ? 'border-primary bg-primary/5' : 'border-border'}`}>{t}</button>
            ))}
            <label className="text-sm sm:col-span-2"><span className="font-medium">Program</span>
              <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{MOCK_PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
            </label>
          </CardContent>
        </Card>
      )}
      {step === 1 && (
        <Card><CardHeader><CardTitle className="text-base">Provide Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input label="Reason" required className="sm:col-span-2" />
            <label className="text-sm sm:col-span-2"><span className="font-medium">Description</span>
              <textarea className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" rows={4} />
            </label>
            <Input label="Amount Requested (RWF)" type="number" />
            <div className="sm:col-span-2 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">Supporting documents<input type="file" className="mt-2 block mx-auto text-xs" multiple /></div>
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <Card><CardHeader><CardTitle className="text-base">Review</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Assistance Type:</strong> {assistanceType}</p>
            <p><strong>Program:</strong> {MOCK_PROGRAMS[0].name}</p>
            <p><strong>Amount:</strong> RWF 500,000</p>
            <p><strong>Assigned Officer:</strong> Patrick Habimana</p>
          </CardContent>
        </Card>
      )}
      {step === 3 && (
        <Card><CardContent className="pt-6 text-center">
          <p className="font-medium">Ready to submit your assistance request?</p>
          <p className="mt-2 text-sm text-muted-foreground">A welfare officer will review your request.</p>
        </CardContent></Card>
      )}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Previous</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/welfare/assistance')}>Cancel</Button>
          {step < STEPS.length - 1 ? <Button onClick={() => setStep((s) => s + 1)}>Next</Button> : <Button onClick={handleSubmit}>Submit Request</Button>}
        </div>
      </div>
    </div>
  );
}
