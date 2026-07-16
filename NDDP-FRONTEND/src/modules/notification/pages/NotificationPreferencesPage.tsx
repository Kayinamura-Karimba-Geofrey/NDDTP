import toast from 'react-hot-toast';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetNotificationPreferencesQuery } from '../api/notification.api';

export function NotificationPreferencesPage() {
  const { data: prefs } = useGetNotificationPreferencesQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Preferences' }]} title="User Notification Preferences" description="Control email, SMS, push, and in-app channels, quiet hours, and language" />
      <NotificationSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Email" defaultValue={prefs?.email ? 'Enabled' : 'Disabled'} />
          <Input label="SMS" defaultValue={prefs?.sms ? 'Enabled' : 'Disabled'} />
          <Input label="Push" defaultValue={prefs?.push ? 'Enabled' : 'Disabled'} />
          <Input label="In-App" defaultValue={prefs?.inApp ? 'Enabled' : 'Disabled'} />
          <Input label="Quiet Hours Start" defaultValue={prefs?.quietHoursStart ?? '22:00'} />
          <Input label="Quiet Hours End" defaultValue={prefs?.quietHoursEnd ?? '06:00'} />
          <Input label="Preferred Language" defaultValue={prefs?.language ?? 'English'} className="sm:col-span-2" />
          <Input label="Emergency Override" defaultValue={prefs?.emergencyOverride ? 'Emergency notifications bypass quiet hours' : 'Disabled'} className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Preferences saved')}>Save Preferences</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
