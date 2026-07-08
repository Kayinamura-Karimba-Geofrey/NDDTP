import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { AdminStatusBadge } from '../components/AdminStatusBadge';
import { useGetConfigEntriesQuery } from '../api/configuration.api';
import type { ConfigEntryRecord } from '../constants/administration-data';

export function ConfigEntriesPage() {
  const { data: entries = [] } = useGetConfigEntriesQuery();

  const columns: DataTableColumn<ConfigEntryRecord>[] = [
    { key: 'key', header: 'Key', render: (r) => <span className="font-mono text-xs">{r.key}</span> },
    { key: 'namespaceCode', header: 'Namespace', render: (r) => r.namespaceCode },
    { key: 'value', header: 'Value', render: (r) => <span className="max-w-[220px] truncate block">{r.value}</span> },
    { key: 'valueType', header: 'Type', render: (r) => r.valueType },
    { key: 'environment', header: 'Env', render: (r) => r.environment },
    { key: 'version', header: 'Ver', render: (r) => r.version },
    { key: 'status', header: 'Status', render: (r) => <AdminStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/administration/entries/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Entries' }]} title="Configuration Entries" description="Keys, values, environments, and activation state" actions={<Link to="/administration/entries/new"><Button><FiPlus className="h-4 w-4" /> New Entry</Button></Link>} />
      <AdminSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={entries as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
