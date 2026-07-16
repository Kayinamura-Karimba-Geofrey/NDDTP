import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';

const LINKS = [
  { title: 'Appearance', description: 'Theme, density, and sidebar', path: '/settings/appearance' },
  { title: 'Language & region', description: 'Locale, timezone, and date format', path: '/settings/language' },
  { title: 'Notifications', description: 'Email, SMS, push, and quiet hours', path: '/settings/notifications' },
  { title: 'App settings overview', description: 'All personal preference hubs', path: '/settings/overview' },
  { title: 'Security', description: 'Password, MFA, sessions, and devices', path: '/settings/security' },
];

export function ProfilePreferencesPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Preferences' }]} title="Preferences" description="Shortcuts to appearance, language, notifications, and security" />
      <ProfileSubNav />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LINKS.map((item) => (
          <Card key={item.path}>
            <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{item.title}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-3 pt-4">
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Link to={item.path}><Button size="sm" variant="outline">Open</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
