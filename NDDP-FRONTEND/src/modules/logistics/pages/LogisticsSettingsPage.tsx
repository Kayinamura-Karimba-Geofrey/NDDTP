import toast from 'react-hot-toast';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function LogisticsSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Settings' }]} title="Logistics Settings" description="Dispatch defaults, delay thresholds, and notification rules" />
      <LogisticsSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Dispatch defaults</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Default transport mode" defaultValue="ROAD" />
            <Input label="Default priority" defaultValue="ROUTINE" />
            <Input label="Auto-schedule lag (hours)" defaultValue="4" type="number" />
            <Button onClick={() => toast.success('Dispatch settings saved')}>Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Alerts</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Delay alert threshold (hours)" defaultValue="2" type="number" />
            <Input label="Notify on critical priority" defaultValue="Email + In-app" />
            <Input label="Checkpoint requirement" defaultValue="Mandatory for priority+" />
            <Button onClick={() => toast.success('Alert settings saved')}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
