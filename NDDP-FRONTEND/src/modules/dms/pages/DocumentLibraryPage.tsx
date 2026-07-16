import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiUpload } from 'react-icons/fi';
import { useGetDmsDocumentsQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { DmsDocument } from '../constants/dms-data';

export function DocumentLibraryPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetDmsDocumentsQuery({ page: 1, limit: 100, search });
  const rows = useMemo(() => data?.data ?? [], [data]);

  const columns: DataTableColumn<DmsDocument>[] = [
    { key: 'num', header: 'Document #', render: (r) => <Link to={`/dms/documents/${r.id}`} className="font-mono text-xs text-primary underline-offset-2 hover:underline">{r.documentNumber}</Link> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'ver', header: 'Version', render: (r) => r.version },
    { key: 'status', header: 'Status', render: (r) => <DmsStatusBadge status={r.status} /> },
    { key: 'mod', header: 'Last Modified', render: (r) => dayjs(r.lastModified).format('DD MMM YYYY HH:mm') },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Library' }]}
        title="Document Library"
        description="Central repository for all organizational documents"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast('Create folder')}><FiPlus className="h-4 w-4" /> Create Folder</Button>
            <Link to="/dms/upload"><Button><FiUpload className="h-4 w-4" /> Upload Document</Button></Link>
          </div>
        }
      />
      <DmsSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search title, number, category, owner…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
