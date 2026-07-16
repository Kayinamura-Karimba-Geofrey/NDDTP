import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MOCK_POSITIONS } from '../constants/users-data';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Position } from '../constants/users-data';

export function PositionsPage() {
  const columns: DataTableColumn<Position>[] = [
    { key: 'title', header: 'Position', render: (p) => <span className="font-medium">{p.title}</span> },
    { key: 'department', header: 'Department' },
    { key: 'users', header: 'Users', render: (p) => p.userCount },
    { key: 'status', header: 'Status', render: (p) => <span className={p.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{p.status}</span> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Disable')}>Disable</Button>
          <Button variant="ghost" size="sm" onClick={() => toast.error('Delete')}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Positions' }]} title="Job Titles / Positions" description="Manage official organizational positions" actions={<Button onClick={() => toast('Create position')}><FiPlus className="h-4 w-4" /> Create Position</Button>} />
      <UserSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_POSITIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
