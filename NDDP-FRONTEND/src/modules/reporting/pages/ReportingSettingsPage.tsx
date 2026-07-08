import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function ReportingSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Settings' }]} title="Reporting Settings" description="Retention, export limits, themes, time zones, formats, KPI thresholds, refresh, and caching" />
      <ReportingSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Report Retention" defaultValue="24 months" />
          <Input label="Export Limits" defaultValue="50 MB synchronous / async queue above" />
          <Input label="Dashboard Theme" defaultValue="NDDTP Light (default)" />
          <Input label="Time Zone" defaultValue="Africa/Kigali (CAT)" />
          <Input label="Default Formats" defaultValue="PDF, Excel, CSV" className="sm:col-span-2" />
          <Input label="KPI Thresholds Policy" defaultValue="Green ≥ target, Amber 90%, Red below" className="sm:col-span-2" />
          <Input label="Data Refresh Frequency" defaultValue="Dashboards: 5 min · Reports: on demand" className="sm:col-span-2" />
          <Input label="Caching Policies" defaultValue="Redis TTL 5–15 minutes for executive KPIs" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
