import { Card, CardContent } from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ANALYTICS_INSIGHTS } from '../constants/reporting-data';

export function AdvancedAnalyticsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Analytics' }]} title="Analytics" description="Department comparison, trends, growth, variance, productivity, workload, and compliance analysis" />
      <ReportingSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ANALYTICS_INSIGHTS.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <span className="text-sm font-semibold text-primary">{item.trend}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
