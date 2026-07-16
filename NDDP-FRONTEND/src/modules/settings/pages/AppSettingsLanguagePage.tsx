import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';
import { updateSettings } from '@/store/slices/settings-slice';
import type { RootState } from '@/store';
import { LANDING_PAGE_OPTIONS } from '../constants/app-settings-data';
import { useState } from 'react';

export function AppSettingsLanguagePage() {
  const dispatch = useDispatch();
  const settings = useSelector((s: RootState) => s.settings);
  const [landingPage, setLandingPage] = useState('/dashboard');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Language' }]} title="Language & Region" description="Locale, timezone, date format, and default landing page" />
      <AppSettingsSubNav />
      <Card className="max-w-2xl">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Regional preferences</CardTitle></CardHeader>
        <CardContent className="grid gap-4 pt-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Language</label>
            <select
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              value={settings.language}
              onChange={(e) => dispatch(updateSettings({ language: e.target.value }))}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="rw">Kinyarwanda</option>
            </select>
          </div>
          <Input
            label="Timezone"
            value={settings.timezone}
            onChange={(e) => dispatch(updateSettings({ timezone: e.target.value }))}
          />
          <Input
            label="Date format"
            value={settings.dateFormat}
            onChange={(e) => dispatch(updateSettings({ dateFormat: e.target.value }))}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium">Default landing page</label>
            <select
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              value={landingPage}
              onChange={(e) => setLandingPage(e.target.value)}
            >
              {LANDING_PAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <Button onClick={() => toast.success('Language & region saved')}>Save</Button>
        </CardContent>
      </Card>
    </div>
  );
}
