import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { AdminStatusBadge } from '../components/AdminStatusBadge';
import { MOCK_HEALTH } from '../constants/administration-data';

export function AdminHealthPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Health' }]} title="Platform Health" description="Service liveness and latency snapshot" />
      <AdminSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_HEALTH.map((svc) => (
          <Card key={svc.id}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-medium">{svc.name}</p>
                <AdminStatusBadge status={svc.status} />
              </div>
              <p className="text-2xl font-bold">{svc.latencyMs}<span className="ml-1 text-sm font-normal text-muted-foreground">ms</span></p>
              <p className="mt-1 text-sm text-muted-foreground">{svc.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
