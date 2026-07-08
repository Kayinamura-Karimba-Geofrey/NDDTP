import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { AdminStatusBadge } from '../components/AdminStatusBadge';
import { useGetConfigNamespacesQuery } from '../api/configuration.api';
import type { ConfigNamespaceRecord } from '../constants/administration-data';

export function ConfigNamespacesPage() {
  const { data: namespaces = [] } = useGetConfigNamespacesQuery();

  const columns: DataTableColumn<ConfigNamespaceRecord>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: 'name', header: 'Namespace', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'description', header: 'Description', render: (r) => r.description },
    { key: 'entryCount', header: 'Entries', render: (r) => r.entryCount },
    { key: 'updatedAt', header: 'Updated', render: (r) => r.updatedAt },
    { key: 'status', header: 'Status', render: (r) => <AdminStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/administration/namespaces/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Namespaces' }]} title="Configuration Namespaces" description="Logical groups for platform configuration keys" actions={<Link to="/administration/namespaces/new"><Button><FiPlus className="h-4 w-4" /> New Namespace</Button></Link>} />
      <AdminSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={namespaces as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
