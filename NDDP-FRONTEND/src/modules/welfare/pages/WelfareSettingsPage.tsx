import { WelfareSubNav } from '../components/WelfareSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function WelfareSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Settings' }]} title="Welfare Settings" description="Global welfare service configuration" />
      <WelfareSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Program Categories" defaultValue="Health & Wellness, Education, Family, Financial, Recreation" />
          <Input label="Benefit Types" defaultValue="Health Insurance, Housing, Education, Transport" />
          <Input label="Approval Workflow" defaultValue="Officer → Manager → HR Director" className="sm:col-span-2" />
          <Input label="Default Program Duration (months)" type="number" defaultValue="12" />
          <Input label="Emergency Priority Levels" defaultValue="Critical, High, Medium, Low" />
          <Input label="Eligibility Rules" defaultValue="Permanent staff, minimum 6 months service" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Application received, Approved, Event reminder" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
