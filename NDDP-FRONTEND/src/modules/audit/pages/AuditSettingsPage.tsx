import { AuditSubNav } from '../components/AuditSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function AuditSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Settings' }]} title="Audit Settings" description="Retention, compliance policies, alert thresholds, monitoring intervals, sampling, and export policies" />
      <AuditSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Log Retention" defaultValue="365 days" />
          <Input label="Audit Retention" defaultValue="7 years (append-only)" />
          <Input label="Compliance Policies" defaultValue="Password, MFA, Access Review, Encryption" className="sm:col-span-2" />
          <Input label="Alert Thresholds" defaultValue="CPU 85%, Error rate 1%, Failed logins 10/5m" className="sm:col-span-2" />
          <Input label="Notification Rules" defaultValue="Critical → on-call + email; High → Slack" className="sm:col-span-2" />
          <Input label="Monitoring Interval" defaultValue="30 seconds" />
          <Input label="Metric Collection Frequency" defaultValue="15 seconds" />
          <Input label="Trace Sampling" defaultValue="10% production / 100% errors" className="sm:col-span-2" />
          <Input label="Export Policies" defaultValue="Authorized roles only; PII masked" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
