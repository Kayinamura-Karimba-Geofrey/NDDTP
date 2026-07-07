import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MedicalSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Settings' }]} title="Medical Settings" description="Assessment templates, access policies, and retention configuration" />
      <MedicalSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Assessment Templates" defaultValue="Annual, Pre-Employment, Return-to-Work, Fitness" />
          <Input label="Clearance Types" defaultValue="General Fitness, Return to Work, Travel, Training" />
          <Input label="Appointment Types" defaultValue="Checkup, Consultation, Vaccination, Follow-up, Emergency" />
          <Input label="Medical Categories" defaultValue="Occupational, Preventive, Emergency, Rehabilitation" />
          <Input label="Data Retention Policy" defaultValue="7 years — encrypted archival" className="sm:col-span-2" />
          <Input label="Access Policy" defaultValue="Medical staff scope only; personnel see own records; managers no unrestricted access" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Appointment reminder, Clearance expiry, Assessment due" className="sm:col-span-2" />
          <Input label="Document Templates" defaultValue="Clearance certificate, Fitness certificate, Referral letter" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
