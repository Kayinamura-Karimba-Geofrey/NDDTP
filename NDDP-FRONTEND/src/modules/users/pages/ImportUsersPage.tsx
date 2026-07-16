import toast from 'react-hot-toast';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function ImportUsersPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Import' }]} title="Import Users" description="Bulk upload users from Excel or CSV" />
      <UserSubNav />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => toast.success('Template downloaded')}><FiDownload className="h-4 w-4" /> Download Template</Button>
          </div>
          <div className="rounded-xl border-2 border-dashed border-border p-12 text-center">
            <FiUpload className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-medium text-foreground">Drop Excel or CSV file here</p>
            <p className="text-sm text-muted-foreground">Supports .xlsx, .xls, .csv with validation and duplicate detection</p>
            <input type="file" accept=".xlsx,.xls,.csv" className="mt-4 text-sm" onChange={() => toast('File selected — preview ready')} />
          </div>
          <Button onClick={() => toast.success('Import completed — 24 users created, 2 errors')}>Run Import</Button>
        </CardContent>
      </Card>
    </div>
  );
}
