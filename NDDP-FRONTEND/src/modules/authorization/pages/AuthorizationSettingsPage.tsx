import { useState } from 'react';
import toast from 'react-hot-toast';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { AUTH_SETTINGS_DEFAULTS, RECOMMENDED_ROLES } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ROUTES } from '@/constants/app';
import { Link } from 'react-router-dom';

export function AuthorizationSettingsPage() {
  const [settings, setSettings] = useState(AUTH_SETTINGS_DEFAULTS);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Settings' }]}
        title="Authorization Settings"
        description="Global access control configuration"
      />
      <AuthorizationSubNav />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">General Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Default Role for New Users"
              value={settings.defaultRole}
              onChange={(e) => setSettings((s) => ({ ...s, defaultRole: e.target.value }))}
            />
            <div>
              <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
              <input
                type="number"
                className="mt-1.5 flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm"
                value={settings.sessionTimeoutMinutes}
                onChange={(e) => setSettings((s) => ({ ...s, sessionTimeoutMinutes: Number(e.target.value) }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.permissionInheritance}
                onChange={(e) => setSettings((s) => ({ ...s, permissionInheritance: e.target.checked }))}
                className="rounded border-border"
              />
              Enable permission inheritance from parent roles
            </label>
            <Input
              label="Delegation Max Duration (days)"
              type="number"
              value={String(settings.delegationMaxDays)}
              onChange={(e) => setSettings((s) => ({ ...s, delegationMaxDays: Number(e.target.value) }))}
            />
            <Input
              label="Approval Threshold (levels)"
              type="number"
              value={String(settings.approvalThreshold)}
              onChange={(e) => setSettings((s) => ({ ...s, approvalThreshold: Number(e.target.value) }))}
            />
            <Input
              label="Audit Retention (days)"
              type="number"
              value={String(settings.auditRetentionDays)}
              onChange={(e) => setSettings((s) => ({ ...s, auditRetentionDays: Number(e.target.value) }))}
            />
            <p className="text-sm text-muted-foreground">
              Password policy: <Link to={ROUTES.CHANGE_PASSWORD} className="underline">Change Password settings</Link>
            </p>
            <Button onClick={() => toast.success('Settings saved')}>Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recommended Role Templates</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Roles based on organizational responsibilities rather than military rank.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {RECOMMENDED_ROLES.map((role) => (
                <li key={role} className="rounded-lg border border-border px-3 py-2 text-sm text-foreground">
                  {role}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
