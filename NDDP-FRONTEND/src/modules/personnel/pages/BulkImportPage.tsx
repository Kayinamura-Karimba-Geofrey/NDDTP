import toast from 'react-hot-toast';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function BulkImportPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Bulk Import' }]} title="Bulk Import" description="Upload personnel records via Excel or CSV" />
      <PersonnelSubNav />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => toast.success('Template downloaded')}><FiDownload className="h-4 w-4" /> Download Template</Button>
          </div>
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <FiUpload className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-medium">Drop Excel or CSV file here</p>
            <p className="text-sm text-muted-foreground">Data validation, duplicate detection, and import preview</p>
            <input type="file" accept=".xlsx,.xls,.csv" className="mt-4 text-sm" onChange={() => toast('Validating file...')} />
          </div>
          <p className="text-sm text-muted-foreground">Features: template download · data validation · duplicate detection · import preview · error report</p>
        </CardContent>
      </Card>
    </div>
  );
}
