import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function AssetSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Settings' }]} title="Asset Settings" description="Categories, numbering, templates, and approval workflows" />
      <AssetSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Asset Number Format" defaultValue="AST-{YEAR}-{SEQUENCE}" />
          <Input label="Default Inspection Frequency" defaultValue="Annual" />
          <Input label="Maintenance Templates" defaultValue="Preventive, Corrective, Emergency" className="sm:col-span-2" />
          <Input label="Reservation Policy" defaultValue="Supervisor approval for shared equipment" className="sm:col-span-2" />
          <Input label="Disposal Approval Workflow" defaultValue="Asset Officer → Manager → Finance" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Maintenance due, Warranty expiry, Overdue return" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
