import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const INTEGRATIONS = [
  { name: 'Microsoft Power BI', status: 'ACTIVE', description: 'Secure REST connectors for executive workspaces' },
  { name: 'Tableau', status: 'INACTIVE', description: 'Enterprise BI extract and live query connectors' },
  { name: 'Apache Superset', status: 'ACTIVE', description: 'Open-source dashboards over reporting datasets' },
  { name: 'Metabase', status: 'INACTIVE', description: 'Self-service questions against curated warehouse views' },
  { name: 'Event Bus', status: 'ACTIVE', description: 'Kafka / RabbitMQ event ingestion for reporting datasets' },
  { name: 'Data Warehouse', status: 'ACTIVE', description: 'Dedicated PostgreSQL reporting store / warehouse sync' },
];

export function BiIntegrationsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'BI Integrations' }]} title="BI Integrations" description="Power BI, Tableau, Superset, Metabase — secure APIs and connectors instead of duplicating advanced BI" />
      <ReportingSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((item) => (
          <Card key={item.name}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <ReportingStatusBadge status={item.status} />
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
