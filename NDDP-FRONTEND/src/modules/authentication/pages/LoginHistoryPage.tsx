import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { FiDownload, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useGetLoginHistoryQuery } from '../api/security.api';
import { AuthSecurityNav } from '../components/AuthSecurityNav';
import { formatLoginResult, type LoginHistoryEntry } from '../constants/auth-mock-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, TablePagination, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';

function parseUserAgent(ua: string | null): { browser: string; device: string } {
  if (!ua) return { browser: '—', device: '—' };
  const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : ua.includes('Edge') ? 'Edge' : 'Other';
  const device = ua.includes('iPhone') || ua.includes('Android') ? 'Mobile' : ua.includes('iPad') ? 'Tablet' : 'Desktop';
  return { browser, device };
}

export function LoginHistoryPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all');
  const { data, isLoading } = useGetLoginHistoryQuery({ page, limit: 10 });

  const filtered = useMemo(() => {
    const rows = data?.data ?? [];
    if (statusFilter === 'all') return rows;
    return rows.filter((row) => {
      const success = row.result === 'SUCCESS';
      return statusFilter === 'success' ? success : !success;
    });
  }, [data?.data, statusFilter]);

  const handleExport = (format: string) => {
    toast.success(`Exporting login history as ${format}...`);
  };

  const columns: DataTableColumn<LoginHistoryEntry>[] = [
    {
      key: 'date',
      header: 'Date',
      render: (row) => dayjs(row.createdAt).format('MMM D, YYYY'),
    },
    {
      key: 'time',
      header: 'Time',
      render: (row) => dayjs(row.createdAt).format('HH:mm:ss'),
    },
    { key: 'ip', header: 'IP', render: (row) => row.ipAddress ?? '—' },
    {
      key: 'browser',
      header: 'Browser',
      render: (row) => parseUserAgent(row.userAgent).browser,
    },
    {
      key: 'device',
      header: 'Device',
      render: (row) => parseUserAgent(row.userAgent).device,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const { label, success } = formatLoginResult(row.result);
        return (
          <span className={success ? 'text-success' : 'text-danger'}>{label}</span>
        );
      },
    },
    {
      key: 'location',
      header: 'Location',
      render: () => 'Kigali, RW',
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authentication', path: '/auth/security' }, { label: 'Login History' }]}
        title="Login History"
        description="Review previous sign-in attempts on your account"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
              <FiDownload className="h-4 w-4" /> PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('Excel')}>
              <FiDownload className="h-4 w-4" /> Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
              <FiDownload className="h-4 w-4" /> CSV
            </Button>
          </div>
        }
      />
      <AuthSecurityNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <FiFilter className="h-4 w-4 text-muted-foreground" />
            {(['all', 'success', 'failed'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  statusFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {isLoading ? (
            <div className="data-table-empty">Loading login history...</div>
          ) : (
            <>
              <DataTable
                columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
                rows={filtered as unknown as Record<string, unknown>[]}
                rowKey={(row) => String(row.id)}
                emptyMessage="No login attempts found"
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
