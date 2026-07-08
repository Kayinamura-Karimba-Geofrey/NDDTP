import toast from 'react-hot-toast';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function CalendarSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Settings' }]} title="Calendar Settings" description="Working hours, time zone, default reminders, visibility, and conflict rules" />
      <CalendarSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Time Zone" defaultValue="Africa/Kigali (CAT)" />
          <Input label="Week Starts On" defaultValue="Monday" />
          <Input label="Working Hours" defaultValue="08:00 – 17:00" />
          <Input label="Default Reminder" defaultValue="15 minutes before" />
          <Input label="Default Calendar" defaultValue="My Personal Calendar" className="sm:col-span-2" />
          <Input label="Conflict Detection" defaultValue="Warn on overlap for required attendees" className="sm:col-span-2" />
          <Input label="Sync Leave Blocks" defaultValue="Enabled — from Leave Service" className="sm:col-span-2" />
          <Input label="Event Visibility Default" defaultValue="Department" />
          <Input label="Holiday Calendar Source" defaultValue="Organizational + National" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Settings saved')}>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
