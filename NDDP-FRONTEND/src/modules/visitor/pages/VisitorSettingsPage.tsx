import toast from 'react-hot-toast';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function VisitorSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Settings' }]} title="Visitor Settings" description="Approval rules, badge expiry, escort policy, retention, and gate notifications" />
      <VisitorSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Default Approval Workflow" defaultValue="Host then Security" className="sm:col-span-2" />
          <Input label="Badge Validity" defaultValue="Same day until 18:00" />
          <Input label="Max Concurrent Visitors / Site" defaultValue="Site capacity enforced" />
          <Input label="Escort Policy" defaultValue="Required for non-cleared visitors" className="sm:col-span-2" />
          <Input label="Blacklist Enforcement" defaultValue="Hard block at registration & check-in" className="sm:col-span-2" />
          <Input label="Retention Period" defaultValue="24 months visit history" />
          <Input label="Gate Notifications" defaultValue="Host + Security on check-in" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Settings saved')}>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
