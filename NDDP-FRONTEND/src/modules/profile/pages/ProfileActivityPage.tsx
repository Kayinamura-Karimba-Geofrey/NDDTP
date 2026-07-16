import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';
import { PROFILE_ACTIVITY } from '../constants/profile-data';

export function ProfileActivityPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Activity' }]}
        title="Account Activity"
        description="Recent sign-ins and preference changes"
        actions={
          <div className="flex gap-2">
            <Link to="/auth/login-history"><Button size="sm" variant="outline">Login history</Button></Link>
            <Link to="/auth/sessions"><Button size="sm" variant="outline">Sessions</Button></Link>
          </div>
        }
      />
      <ProfileSubNav />
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent activity</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {PROFILE_ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-3 py-3 text-sm">
              <div>
                <p className="font-medium">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.type}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{a.at}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
