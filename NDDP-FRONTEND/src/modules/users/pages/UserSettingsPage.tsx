import { useState } from 'react';
import toast from 'react-hot-toast';
import { USER_SETTINGS_DEFAULTS } from '../constants/users-data';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function UserSettingsPage() {
  const [settings, setSettings] = useState(USER_SETTINGS_DEFAULTS);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Settings' }]} title="User Settings" description="Global user management configuration for administrators" />
      <UserSubNav />
      <Card className="max-w-xl">
        <CardHeader><CardTitle className="text-base">Administrator Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Employee Number Format" value={settings.employeeNumberFormat} onChange={(e) => setSettings((s) => ({ ...s, employeeNumberFormat: e.target.value }))} />
          <Input label="Default User Status" value={settings.defaultStatus} onChange={(e) => setSettings((s) => ({ ...s, defaultStatus: e.target.value }))} />
          <Input label="Allowed File Types" value={settings.allowedFileTypes} onChange={(e) => setSettings((s) => ({ ...s, allowedFileTypes: e.target.value }))} />
          <Input label="Max Upload Size (MB)" type="number" value={String(settings.maxUploadSizeMb)} onChange={(e) => setSettings((s) => ({ ...s, maxUploadSizeMb: Number(e.target.value) }))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.profilePictureRequired} onChange={(e) => setSettings((s) => ({ ...s, profilePictureRequired: e.target.checked }))} className="rounded border-border" />
            Profile picture required
          </label>
          <div>
            <p className="text-sm font-medium">Required Profile Fields</p>
            <p className="mt-1 text-sm text-muted-foreground">{settings.requiredFields.join(', ')}</p>
          </div>
          <Button onClick={() => toast.success('Settings saved')}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
