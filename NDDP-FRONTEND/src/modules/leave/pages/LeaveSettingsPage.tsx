import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function LeaveSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Settings' }]} title="Leave Settings" description="Global leave management configuration" />
      <LeaveSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Default Leave Year Start" type="date" defaultValue="2026-01-01" />
          <Input label="Working Days per Week" type="number" defaultValue="5" />
          <Input label="Weekend Days" defaultValue="Saturday, Sunday" />
          <Input label="Approval Levels" defaultValue="Manager → HR (if > 10 days)" />
          <Input label="Auto Reminder (days before)" type="number" defaultValue="3" className="sm:col-span-2" />
          <Input label="Balance Calculation Rule" defaultValue="Accrual-based with carry-over" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
