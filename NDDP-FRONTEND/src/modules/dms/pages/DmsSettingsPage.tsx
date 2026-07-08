import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function DmsSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Settings' }]} title="DMS Settings" description="Storage provider, limits, retention, signatures, virus scanning, watermarking" />
      <DmsSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Storage Provider" defaultValue="MinIO / Garage S3" className="sm:col-span-2" />
          <Input label="Max File Size" defaultValue="100 MB" />
          <Input label="Allowed File Types" defaultValue="PDF, DOCX, XLSX, PPTX, PNG, JPG, TXT, CSV" />
          <Input label="OCR Settings" defaultValue="Disabled (future enhancement)" className="sm:col-span-2" />
          <Input label="Versioning Rules" defaultValue="Major on approval; minor on content edits" className="sm:col-span-2" />
          <Input label="Retention Policies" defaultValue="Per record series — see Retention module" className="sm:col-span-2" />
          <Input label="Signature Providers" defaultValue="Internal e-sign + certified timestamps" className="sm:col-span-2" />
          <Input label="Virus Scanning" defaultValue="Enabled — scan on upload" />
          <Input label="Watermarking" defaultValue="Confidential / Restricted downloads" />
          <Input label="External Sharing Rules" defaultValue="Disabled by default — temporary links require approval" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
