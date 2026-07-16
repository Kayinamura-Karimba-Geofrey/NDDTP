import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';
import { APP_SETTINGS_KPIS, APP_SETTINGS_SHORTCUTS } from '../constants/app-settings-data';

export function AppSettingsOverviewPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Overview' }]} title="Settings" description="Manage your profile, appearance, language, notifications, and security" />
      <AppSettingsSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {APP_SETTINGS_KPIS.map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-2xl font-bold">{k.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{k.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Quick links</CardTitle></CardHeader>
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {APP_SETTINGS_SHORTCUTS.map((s) => (
            <div key={s.id} className="flex flex-col justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
              </div>
              <Link to={s.path} className="mt-3"><Button size="sm" variant="outline">Open</Button></Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
