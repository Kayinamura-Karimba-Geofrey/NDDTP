import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_RETENTION, type RetentionRule } from '../constants/dms-data';

export function RecordsRetentionPage() {
  const columns: DataTableColumn<RetentionRule>[] = [
    { key: 'type', header: 'Record Type', render: (r) => <span className="font-medium">{r.recordType}</span> },
    { key: 'period', header: 'Retention Period', render: (r) => r.retentionPeriod },
    { key: 'hold', header: 'Legal Hold', render: (r) => (r.legalHold ? 'Yes' : 'No') },
    { key: 'active', header: 'Active Records', render: (r) => r.activeRecords.toLocaleString() },
    { key: 'near', header: 'Near Expiry', render: (r) => r.nearExpiry },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Retention' }]} title="Records Retention" description="Automated retention calculation, expiry alerts, legal hold, disposal approval" />
      <DmsSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Review within 90 days</p><p className="text-2xl font-bold">311</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Archived this month</p><p className="text-2xl font-bold">1,842</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Disposal pending</p><p className="text-2xl font-bold">27</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Retention Rules</CardTitle></CardHeader>
        <CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RETENTION as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent>
      </Card>
    </div>
  );
}
