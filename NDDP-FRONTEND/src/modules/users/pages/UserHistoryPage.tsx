import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiDownload } from 'react-icons/fi';
import { MOCK_USER_HISTORY } from '../constants/users-data';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { UserHistoryEntry } from '../constants/users-data';

export function UserHistoryPage() {
  const [moduleFilter, setModuleFilter] = useState('all');
  const modules = ['all', ...new Set(MOCK_USER_HISTORY.map((e) => e.module))];
  const filtered = moduleFilter === 'all' ? MOCK_USER_HISTORY : MOCK_USER_HISTORY.filter((e) => e.module === moduleFilter);

  const columns: DataTableColumn<UserHistoryEntry>[] = [
    { key: 'time', header: 'Date', render: (e) => dayjs(e.timestamp).format('MMM D, YYYY HH:mm') },
    { key: 'user', header: 'User' },
    { key: 'action', header: 'Action' },
    { key: 'module', header: 'Module' },
    { key: 'old', header: 'Old Value', render: (e) => <code className="text-xs">{e.oldValue}</code> },
    { key: 'new', header: 'New Value', render: (e) => <code className="text-xs">{e.newValue}</code> },
    { key: 'by', header: 'Performed By', render: (e) => e.performedBy },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'History' }]}
        title="User History"
        description="Audit trail for profile, organization, status, and role events"
        actions={<Button variant="outline" size="sm" onClick={() => toast.success('Exporting...')}><FiDownload className="h-4 w-4" /> Export</Button>}
      />
      <UserSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {modules.map((m) => (
              <button key={m} type="button" onClick={() => setModuleFilter(m)} className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${moduleFilter === m ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{m}</button>
            ))}
          </div>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={filtered as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}
