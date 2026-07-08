import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';
import { useGetNotificationPreferencesQuery } from '@/modules/notification/api/notification.api';

export function AppSettingsNotificationsPage() {
  const { data: prefs } = useGetNotificationPreferencesQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Notifications' }]} title="Notification Preferences" description="Channel defaults and quiet hours for your account" />
      <AppSettingsSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Channels</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
            <Input label="Email" defaultValue={prefs?.email ? 'Enabled' : 'Disabled'} />
            <Input label="SMS" defaultValue={prefs?.sms ? 'Enabled' : 'Disabled'} />
            <Input label="Push" defaultValue={prefs?.push ? 'Enabled' : 'Disabled'} />
            <Input label="In-App" defaultValue={prefs?.inApp ? 'Enabled' : 'Disabled'} />
            <Input label="Quiet Hours Start" defaultValue={prefs?.quietHoursStart ?? '22:00'} />
            <Input label="Quiet Hours End" defaultValue={prefs?.quietHoursEnd ?? '06:00'} />
            <div className="sm:col-span-2 flex flex-wrap gap-2">
              <Button onClick={() => toast.success('Notification preferences saved')}>Save</Button>
              <Link to="/notifications/preferences"><Button variant="outline">Full preferences</Button></Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Overrides</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <p className="text-muted-foreground">Emergency override: <span className="font-medium text-foreground">{prefs?.emergencyOverride ? 'On' : 'Off'}</span></p>
            <p className="text-muted-foreground">Preferred language: <span className="font-medium text-foreground">{prefs?.language ?? 'English'}</span></p>
            <p className="text-muted-foreground">Critical security and ops alerts may still deliver during quiet hours when override is enabled.</p>
            <Link to="/notifications/inbox"><Button size="sm" variant="outline">Open inbox</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
