import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_PERFORMANCE } from '../constants/audit-data';

export function PerformanceMetricsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Performance' }]} title="Performance Metrics" description="RPS, response time, slow queries, queue processing, cache hit ratio, and job duration" />
      <AuditSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PERFORMANCE.map((m) => (
          <Card key={m.id}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{m.name}</h3>
                <AuditStatusBadge status={m.status} />
              </div>
              <p className="text-2xl font-bold">{m.value}<span className="ml-1 text-sm font-normal text-muted-foreground">{m.unit}</span></p>
              <p className="mt-1 text-xs text-muted-foreground">Trend {m.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
