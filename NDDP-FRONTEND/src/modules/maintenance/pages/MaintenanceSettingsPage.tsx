import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MaintenanceSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Settings' }]} title="Maintenance Settings" description="Approval rules, default priorities, notifications, and inventory integration" />
      <MaintenanceSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Default Approval Workflow" defaultValue="Supervisor then Facilities Manager" className="sm:col-span-2" />
          <Input label="Default Priority" defaultValue="MEDIUM" />
          <Input label="Emergency Escalation" defaultValue="Immediate on-call notification" />
          <Input label="Preventive Lead Time" defaultValue="Generate WO 3 days before due" className="sm:col-span-2" />
          <Input label="Parts Low-Stock Alerts" defaultValue="Enabled — notify storekeeper" className="sm:col-span-2" />
          <Input label="Working Hours" defaultValue="Mon–Fri 07:30–17:00" />
          <Input label="Asset Sync Sources" defaultValue="Fleet, Facilities, Assets" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Settings saved')}>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
