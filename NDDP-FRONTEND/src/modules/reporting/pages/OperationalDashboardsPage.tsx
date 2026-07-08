import { Link } from 'react-router-dom';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { OPERATIONAL_DASHBOARDS } from '../constants/reporting-data';

export function OperationalDashboardsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Operational' }]} title="Operational Dashboards" description="Department-level dashboards for personnel, training, finance, fleet, medical, procurement, and more" />
      <ReportingSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPERATIONAL_DASHBOARDS.map((d) => (
          <Card key={d.id}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{d.name}</h3>
                <ReportingStatusBadge status={d.status} />
              </div>
              <p className="text-sm text-muted-foreground">{d.domain} · {d.kpis} KPIs</p>
              <Link to="/reports/dashboard" className="mt-3 inline-block text-xs font-medium text-primary hover:underline">Open dashboard</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
