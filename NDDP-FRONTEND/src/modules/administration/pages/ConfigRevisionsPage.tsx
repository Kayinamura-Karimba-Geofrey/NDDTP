import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { useGetConfigRevisionsQuery } from '../api/configuration.api';
import type { ConfigRevisionRecord } from '../constants/administration-data';

export function ConfigRevisionsPage() {
  const { data: revisions = [] } = useGetConfigRevisionsQuery();

  const columns: DataTableColumn<ConfigRevisionRecord>[] = [
    { key: 'entryKey', header: 'Key', render: (r) => <span className="font-mono text-xs">{r.entryKey}</span> },
    { key: 'version', header: 'Ver', render: (r) => r.version },
    { key: 'previousValue', header: 'Previous', render: (r) => <span className="max-w-[160px] truncate block">{r.previousValue}</span> },
    { key: 'newValue', header: 'New', render: (r) => <span className="max-w-[160px] truncate block">{r.newValue}</span> },
    { key: 'changedBy', header: 'By', render: (r) => r.changedBy },
    { key: 'changedAt', header: 'When', render: (r) => r.changedAt },
    { key: 'note', header: 'Note', render: (r) => r.note },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/administration/revisions/entry/${r.entryId}`}><Button size="sm" variant="outline">History</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Revisions' }]} title="Configuration Revisions" description="Change history across configuration entries" />
      <AdminSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={revisions as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
