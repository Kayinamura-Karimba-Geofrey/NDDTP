import { useState } from 'react';
import toast from 'react-hot-toast';
import { USER_PREFERENCE_DEFAULTS } from '../constants/users-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { UserSubNav } from '../components/UserSubNav';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function UserPreferencesPage() {
  const [prefs, setPrefs] = useState(USER_PREFERENCE_DEFAULTS);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Preferences' }]} title="User Preferences" description="Personal display and notification settings" />
      <UserSubNav />
      <Card className="max-w-xl">
        <CardHeader><CardTitle className="text-base">My Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Language</label>
            <select className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm" value={prefs.language} onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}>
              <option value="en">English</option><option value="fr">Français</option><option value="rw">Kinyarwanda</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Theme</label>
            <select className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm" value={prefs.theme} onChange={(e) => setPrefs((p) => ({ ...p, theme: e.target.value }))}>
              <option value="light">Light</option><option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Time Zone</label>
            <input className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm" value={prefs.timezone} onChange={(e) => setPrefs((p) => ({ ...p, timezone: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium">Date Format</label>
            <input className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm" value={prefs.dateFormat} onChange={(e) => setPrefs((p) => ({ ...p, dateFormat: e.target.value }))} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={prefs.emailNotifications} onChange={(e) => setPrefs((p) => ({ ...p, emailNotifications: e.target.checked }))} className="rounded border-border" />
            Email notifications
          </label>
          <div>
            <label className="text-sm font-medium">Default Landing Page</label>
            <input className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm" value={prefs.defaultLandingPage} onChange={(e) => setPrefs((p) => ({ ...p, defaultLandingPage: e.target.value }))} />
          </div>
          <Button onClick={() => toast.success('Preferences saved')}>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
