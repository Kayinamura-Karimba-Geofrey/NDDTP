import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const INTEGRATIONS = [
  { name: 'OpenTelemetry', status: 'ACTIVE', description: 'Distributed tracing instrumentation across services' },
  { name: 'Prometheus', status: 'ACTIVE', description: 'Metrics collection and scraping' },
  { name: 'Grafana', status: 'ACTIVE', description: 'Operational dashboards and visualization' },
  { name: 'Loki / OpenSearch', status: 'ACTIVE', description: 'Centralized log aggregation' },
  { name: 'Jaeger / Tempo', status: 'INACTIVE', description: 'Trace visualization backends' },
  { name: 'Sentry', status: 'INACTIVE', description: 'Application error tracking' },
  { name: 'SIEM', status: 'INACTIVE', description: 'Optional security information and event management' },
];

export function AuditIntegrationsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Integrations' }]} title="Integrations" description="OpenTelemetry, Prometheus, Grafana, Loki/OpenSearch, Jaeger/Tempo, Sentry, and SIEM — modular and replaceable" />
      <AuditSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((item) => (
          <Card key={item.name}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <AuditStatusBadge status={item.status} />
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
