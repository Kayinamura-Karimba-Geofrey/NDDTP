import { AuditSubNav } from '../components/AuditSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_CONFIG_CHANGES, type ConfigChange } from '../constants/audit-data';

export function ConfigChangesPage() {
  const columns: DataTableColumn<ConfigChange>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'area', header: 'Area', render: (r) => <span className="font-medium">{r.area}</span> },
    { key: 'by', header: 'Changed By', render: (r) => r.changedBy },
    { key: 'before', header: 'Before', render: (r) => <code className="text-xs">{r.before}</code> },
    { key: 'after', header: 'After', render: (r) => <code className="text-xs">{r.after}</code> },
    { key: 'approval', header: 'Approval Ref', render: (r) => r.approvalRef ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Config Changes' }]} title="Configuration Changes" description="Role, permission, workflow, SMTP, security policy, and template modifications with before/after values" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_CONFIG_CHANGES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
