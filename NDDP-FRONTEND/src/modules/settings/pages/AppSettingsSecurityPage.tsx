import { Link } from 'react-router-dom';
import { FiKey, FiMonitor, FiShield, FiSmartphone, FiClock } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';

const LINKS = [
  { title: 'Security settings', description: 'MFA setup, recovery email, and session timeout', path: '/auth/security', icon: FiShield },
  { title: 'Change password', description: 'Update your sign-in credentials', path: '/auth/change-password', icon: FiKey },
  { title: 'Active sessions', description: 'Review and revoke signed-in sessions', path: '/auth/sessions', icon: FiMonitor },
  { title: 'Trusted devices', description: 'Manage devices linked to your account', path: '/auth/devices', icon: FiSmartphone },
  { title: 'Login history', description: 'Recent authentication activity', path: '/auth/login-history', icon: FiClock },
];

export function AppSettingsSecurityPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Security' }]} title="Security" description="Password, MFA, sessions, and device controls" />
      <AppSettingsSubNav />
      <div className="grid gap-4 md:grid-cols-2">
        {LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.path}>
              <CardHeader className="border-b border-border pb-3 flex-row items-center gap-3 space-y-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted"><Icon className="h-4 w-4" /></span>
                <CardTitle className="text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 pt-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <Link to={item.path}><Button size="sm" variant="outline">Open</Button></Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
