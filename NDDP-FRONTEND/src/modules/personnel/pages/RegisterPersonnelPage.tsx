import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

const STEPS = ['Personal Information', 'Employment', 'Organization', 'Qualifications', 'Documents', 'Review'];

export function RegisterPersonnelPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleSubmit = () => {
    toast.success('Personnel registered successfully');
    navigate('/personnel/directory');
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Register Personnel' }]} title="Register Personnel" description="Multi-step wizard to create a new personnel record" />
      <PersonnelSubNav />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${step === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}. {s}</button>
        ))}
      </div>
      {step === 0 && (
        <Card><CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input label="First Name" required /><Input label="Middle Name" /><Input label="Last Name" required />
            <Input label="Date of Birth" type="date" /><Input label="Gender" /><Input label="Nationality" defaultValue="Rwandan" />
            <Input label="National ID" /><Input label="Passport Number" /><Input label="Marital Status" />
            <Input label="Phone" /><Input label="Email" type="email" required /><Input label="Address" className="sm:col-span-2" />
          </CardContent>
        </Card>
      )}
      {step === 1 && (
        <Card><CardHeader><CardTitle className="text-base">Employment</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input label="Personnel Number" required /><Input label="Employee Number" />
            <Input label="Employment Type" defaultValue="PERMANENT" /><Input label="Hire Date" type="date" required />
            <Input label="Contract End Date" type="date" /><Input label="Employment Status" defaultValue="ACTIVE" />
            <Input label="Supervisor" /><Input label="Work Location" />
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <Card><CardHeader><CardTitle className="text-base">Organization Assignment</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input label="Department" required /><Input label="Division" /><Input label="Unit" />
            <Input label="Team" /><Input label="Position" required /><Input label="Office" />
          </CardContent>
        </Card>
      )}
      {step === 3 && (
        <Card><CardHeader><CardTitle className="text-base">Qualifications</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input label="Highest Qualification" /><Input label="Institution" /><Input label="Graduation Date" type="date" />
            <Input label="Professional Certification" /><Input label="Languages" placeholder="e.g. English, French, Kinyarwanda" />
          </CardContent>
        </Card>
      )}
      {step === 4 && (
        <Card><CardHeader><CardTitle className="text-base">Documents</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {['Employment Contract', 'Appointment Letter', 'ID Document', 'Academic Certificates', 'Other'].map((doc) => (
              <div key={doc} className="rounded-lg border border-dashed border-border p-4 text-center">
                <p className="text-sm font-medium">{doc}</p>
                <input type="file" className="mt-2 text-xs" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {step === 5 && (
        <Card><CardHeader><CardTitle className="text-base">Review & Submit</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Review all entered information before submitting. A platform user account can be linked through the User Service after registration.</p></CardContent>
        </Card>
      )}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Previous</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/personnel/directory')}>Cancel</Button>
          {step < STEPS.length - 1 ? <Button onClick={() => setStep((s) => s + 1)}>Next</Button> : <Button onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
}
