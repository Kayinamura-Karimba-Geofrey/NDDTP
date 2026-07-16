import toast from 'react-hot-toast';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function FacilitiesSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Settings' }]} title="Facilities Settings" description="Booking rules, default hours, and notification preferences" />
      <FacilitiesSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Booking rules</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Max advance booking (days)" defaultValue="30" type="number" />
            <Input label="Min booking duration (minutes)" defaultValue="30" type="number" />
            <Input label="Default approval" defaultValue="Manager review required" />
            <Button onClick={() => toast.success('Booking rules saved')}>Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Booking confirmation channel" defaultValue="Email + In-app" />
            <Input label="Inspection reminder (days before)" defaultValue="3" type="number" />
            <Input label="Utility alert threshold" defaultValue="15% above baseline" />
            <Button onClick={() => toast.success('Notification settings saved')}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
