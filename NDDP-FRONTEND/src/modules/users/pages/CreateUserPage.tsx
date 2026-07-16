import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { UserSubNav } from '../components/UserSubNav';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function CreateUserPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const sections = ['Personal', 'Contact', 'Employment', 'Organization', 'Account', 'Documents'];

  const handleSubmit = () => {
    toast.success('User created successfully');
    navigate('/users/list');
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Create User' }]} title="Create User" description="Register a new platform user" />
      <UserSubNav />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {sections.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${step === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {step === 0 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" required /><Input label="Middle Name" /><Input label="Last Name" required />
              <Input label="Preferred Name" /><Input label="Date of Birth" type="date" /><Input label="Gender" placeholder="Select..." />
              <Input label="National ID" /><Input label="Passport Number" /><Input label="Employee Number" required />
            </CardContent>
          </Card>
        )}
        {step === 1 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Input label="Email" type="email" required /><Input label="Phone Number" /><Input label="Emergency Contact" />
              <Input label="Address" className="sm:col-span-2" />
            </CardContent>
          </Card>
        )}
        {step === 2 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Employment Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Input label="Department" /><Input label="Unit" /><Input label="Position" /><Input label="Employment Type" />
              <Input label="Employment Date" type="date" /><Input label="Supervisor" />
            </CardContent>
          </Card>
        )}
        {step === 3 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Organization Assignment</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Input label="Division" /><Input label="Office" /><Input label="Work Location" />
            </CardContent>
          </Card>
        )}
        {step === 4 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Account Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Input label="Username" /><Input label="Initial Status" defaultValue="PENDING" />
              <p className="sm:col-span-2 text-sm text-muted-foreground">Role assignment is managed through the Authorization module after account creation.</p>
            </CardContent>
          </Card>
        )}
        {step === 5 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Documents</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {['Passport Photo', 'Employment Letter', 'ID Document', 'Other Attachments'].map((doc) => (
                <div key={doc} className="rounded-lg border border-dashed border-border p-4 text-center">
                  <p className="text-sm font-medium text-foreground">{doc}</p>
                  <input type="file" className="mt-2 text-xs" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Previous</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/users/list')}>Cancel</Button>
          {step < sections.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Create User</Button>
          )}
        </div>
      </div>
    </div>
  );
}
