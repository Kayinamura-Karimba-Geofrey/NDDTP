import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_AUDIT_REPORTS, type AuditReportRow } from '../constants/reporting-data';

export function AuditReportsPage() {
  const columns: DataTableColumn<AuditReportRow>[] = [
    { key: 'type', header: 'Type', render: (r) => <span className="font-medium">{r.type}</span> },
    { key: 'actor', header: 'Actor', render: (r) => r.actor },
    { key: 'summary', header: 'Summary', render: (r) => r.summary },
    { key: 'time', header: 'Timestamp', render: (r) => r.timestamp },
    { key: 'severity', header: 'Severity', render: (r) => r.severity },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Audit' }]} title="Audit Reports" description="System-wide reporting on logins, approvals, changes, access attempts, configuration changes, and security events" />
      <ReportingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_AUDIT_REPORTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
