import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiDownload } from 'react-icons/fi';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MOCK_AUDIT_LOG } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PermissionAuditEntry } from '../constants/authorization-data';

export function PermissionAuditPage() {
  const [moduleFilter, setModuleFilter] = useState('all');
  const modules = ['all', ...new Set(MOCK_AUDIT_LOG.map((e) => e.module))];
  const filtered = moduleFilter === 'all' ? MOCK_AUDIT_LOG : MOCK_AUDIT_LOG.filter((e) => e.module === moduleFilter);

  const columns: DataTableColumn<PermissionAuditEntry>[] = [
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY HH:mm') },
    { key: 'user', header: 'User' },
    { key: 'action', header: 'Action' },
    { key: 'module', header: 'Module' },
    { key: 'old', header: 'Old Value', render: (r) => <code className="text-xs">{r.oldValue}</code> },
    { key: 'new', header: 'New Value', render: (r) => <code className="text-xs">{r.newValue}</code> },
    { key: 'by', header: 'Performed By', render: (r) => r.performedBy },
    { key: 'ip', header: 'IP', render: (r) => r.ipAddress },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Permission Audit' }]}
        title="Permission Audit"
        description="Track all authorization changes across the platform"
        actions={
          <div className="flex gap-2">
            {['PDF', 'Excel', 'CSV'].map((fmt) => (
              <Button key={fmt} variant="outline" size="sm" onClick={() => toast.success(`Exporting ${fmt}...`)}>
                <FiDownload className="h-4 w-4" /> {fmt}
              </Button>
            ))}
          </div>
        }
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {modules.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModuleFilter(m)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${moduleFilter === m ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <DataTable
            columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
            rows={filtered as unknown as Record<string, unknown>[]}
            rowKey={(r) => String(r.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
