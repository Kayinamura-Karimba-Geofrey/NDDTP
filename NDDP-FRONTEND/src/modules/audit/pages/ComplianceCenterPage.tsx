import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_COMPLIANCE, type ComplianceItem } from '../constants/audit-data';

export function ComplianceCenterPage() {
  const columns: DataTableColumn<ComplianceItem>[] = [
    { key: 'name', header: 'Control', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'domain', header: 'Domain', render: (r) => r.domain },
    { key: 'score', header: 'Score', render: (r) => r.score },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'reviewed', header: 'Last Reviewed', render: (r) => r.lastReviewed },
    { key: 'status', header: 'Status', render: (r) => <AuditStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Compliance' }]} title="Compliance Center" description="Password policy, MFA, retention, access reviews, encryption, and backup compliance" />
      <AuditSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_COMPLIANCE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
