import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiRefreshCw, FiSearch, FiTrash2 } from 'react-icons/fi';
import {
  useGetSessionsQuery,
  useRevokeSessionMutation,
  useRevokeAllSessionsMutation,
} from '../api/security.api';
import { AuthSecurityNav } from '../components/AuthSecurityNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, TablePagination, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { AuthSession } from '../constants/auth-mock-data';

export function SessionManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch, isFetching } = useGetSessionsQuery({ page, limit: 10 });
  const [revokeSession] = useRevokeSessionMutation();
  const [revokeAll, { isLoading: revokingAll }] = useRevokeAllSessionsMutation();

  const rows = (data?.data ?? []).filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.deviceName?.toLowerCase().includes(q) ||
      s.platform?.toLowerCase().includes(q) ||
      s.ipAddress?.includes(q)
    );
  });

  const handleRevoke = async (session: AuthSession) => {
    if (session.isCurrent) {
      toast.error('Cannot terminate your current session from here. Use logout instead.');
      return;
    }
    try {
      await revokeSession(session.id).unwrap();
      toast.success('Session terminated');
    } catch {
      toast.error('Failed to terminate session');
    }
  };

  const handleRevokeAll = async () => {
    if (!window.confirm('Terminate all other sessions?')) return;
    try {
      await revokeAll().unwrap();
      toast.success('All other sessions terminated');
    } catch {
      toast.error('Failed to terminate sessions');
    }
  };

  const columns: DataTableColumn<AuthSession>[] = [
    {
      key: 'device',
      header: 'Device / Browser',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.deviceName ?? 'Unknown'}</p>
          <p className="text-xs text-muted-foreground">{row.platform ?? '—'}</p>
        </div>
      ),
    },
    { key: 'ip', header: 'IP Address', render: (row) => row.ipAddress ?? '—' },
    {
      key: 'login',
      header: 'Login Time',
      render: (row) => dayjs(row.createdAt).format('MMM D, YYYY HH:mm'),
    },
    {
      key: 'activity',
      header: 'Last Activity',
      render: (row) => (row.lastActivityAt ? dayjs(row.lastActivityAt).format('MMM D, HH:mm') : '—'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
          row.isCurrent ? 'bg-primary/10 text-foreground' : row.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
        }`}>
          {row.isCurrent ? 'Current' : row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          disabled={row.isCurrent}
          onClick={() => handleRevoke(row)}
        >
          <FiTrash2 className="h-4 w-4" /> Terminate
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authentication', path: '/auth/security' }, { label: 'Sessions' }]}
        title="Session Management"
        description="View and manage your active platform sessions"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
              <FiRefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="danger" size="sm" isLoading={revokingAll} onClick={handleRevokeAll}>
              Terminate All Sessions
            </Button>
          </div>
        }
      />
      <AuthSecurityNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 max-w-sm">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search device, browser, IP..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="data-table-empty">Loading sessions...</div>
          ) : (
            <>
              <DataTable
                columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
                rows={rows as unknown as Record<string, unknown>[]}
                rowKey={(row) => String(row.id)}
                emptyMessage="No active sessions found"
              />
              {data?.meta && (
                <TablePagination
                  page={data.meta.page}
                  totalPages={data.meta.totalPages}
                  total={data.meta.total}
                  pageSize={data.meta.limit}
                  hasPreviousPage={data.meta.hasPreviousPage}
                  hasNextPage={data.meta.hasNextPage}
                  onPrevious={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => p + 1)}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
