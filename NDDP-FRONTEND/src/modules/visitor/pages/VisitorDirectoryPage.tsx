import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitorDirectoryQuery } from '../api/visitor.api';
import type { VisitorRecord } from '../constants/visitor-data';

export function VisitorDirectoryPage() {
  const { data: visitors = [] } = useGetVisitorDirectoryQuery();

  const columns: DataTableColumn<VisitorRecord>[] = [
    { key: 'name', header: 'Visitor', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'org', header: 'Organization', render: (r) => r.organization },
    { key: 'idType', header: 'ID Type', render: (r) => r.idType.replace(/_/g, ' ') },
    { key: 'idNum', header: 'ID Number', render: (r) => <span className="font-mono text-xs">{r.idNumber}</span> },
    { key: 'visits', header: 'Visits', render: (r) => r.visits },
    { key: 'last', header: 'Last Visit', render: (r) => r.lastVisit ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/visitors/directory/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Directory' }]} title="Visitor Directory" description="Registered visitors, ID documents, and visit history" actions={<Link to="/visitors/register"><Button><FiPlus className="h-4 w-4" /> Register Visitor</Button></Link>} />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={visitors as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
